"use client";

import { Plus } from "lucide-react";
import { handleMoveUserStoryToSprint } from "../../backlog/actions";
import type {
  Member,
  ProjectSprint,
  Session,
  UserData,
  UserStory,
} from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  startPockerPlanningConnection,
  pockerPlanningConnection,
} from "./connection";

const MARKS = [1, 2, 3, 5, 8, 13, 21, 34];

export const TasksSidebar = ({
  session,
  userInfo,
  projectName,
  sprintName,
  projectTasks,
  sprintTasks,
  sprintInfo,
}: {
  projectTasks: UserStory[];
  sprintTasks: UserStory[];
  session: Session;
  userInfo: UserData | null;
  projectName: string;
  sprintName: string;
  sprintInfo: ProjectSprint;
}) => {
  const [activeTask, setActiveTask] = useState<UserStory | null>(null);
  const [currentMark, setCurrentMark] = useState<number | null>(null);
  const [channelMembers, setChannelMembers] = useState<
    Omit<Member, "role" | "id">[]
  >([]);
  const channelMembersRef = useRef<typeof channelMembers>(channelMembers);

  const router = useRouter();

  const isPlanning = false;

  const queryClient = useQueryClient();

  const { mutate: moveTaskToSprint } = useMutation({
    mutationFn: handleMoveUserStoryToSprint,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["sprint-user-stories"],
      });
      void router.refresh();
    },
  });

  useEffect(() => {
    channelMembersRef.current = channelMembers;
  }, [channelMembers]);

  useEffect(() => {
    if (!userInfo) return;
    void startPockerPlanningConnection({
      sprintId: sprintInfo.id,
      member: userInfo,
    });
    setChannelMembers((prev) => [
      ...prev,
      {
        avatar: userInfo.avatar ?? "",
        name: userInfo.name,
        userId: userInfo.userId,
      },
    ]);

    pockerPlanningConnection.on(
      "MemberJoined",
      (memberId: string, memberName: string, memberAvatar: string) => {
        setChannelMembers((prev) => [
          ...prev,
          { userId: memberId, name: memberName, avatar: memberAvatar },
        ]);
      },
    );
  }, [userInfo]);

  return (
    <div className="h-full border-l border-neutral-800/60 px-8 py-6">
      {isPlanning && (
        <>
          <h2 className="pb-6 text-2xl font-semibold text-neutral-200">
            Задачи бэклога
          </h2>
          <ul className="grid gap-4">
            {projectTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-neutral-200 outline outline-1 outline-neutral-800 transition-colors duration-150 hover:text-neutral-300 hover:outline hover:outline-1 hover:outline-offset-1 hover:outline-neutral-800/60"
              >
                <span>{task.title}</span>
                <button
                  onClick={() =>
                    void moveTaskToSprint({
                      token: session!.token,
                      projectName,
                      sprintName,
                      userStoryId: task.id,
                    })
                  }
                  className="rounded-full border border-white transition-transform duration-150 hover:scale-105 focus-visible:scale-105"
                >
                  <Plus color="#FFFFFF" size={20} />
                </button>
              </div>
            ))}
          </ul>
        </>
      )}
      {!isPlanning && (
        <div className="flex h-full flex-col">
          <div className="flex-1">
            <h2 className="pb-6 text-2xl font-semibold text-neutral-200">
              Покер-планирование
            </h2>
            {activeTask && (
              <div className="grid gap-4">
                <div className="flex gap-2 font-medium text-neutral-400">
                  Оценка задачи:
                  <span className="font-semibold text-white">
                    {activeTask.title}
                  </span>
                </div>
                {channelMembers.length > 0 && (
                  <div>
                    {channelMembers.map((member) => (
                      <div className="text-white" key={member.userId}>
                        {member.name}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {MARKS.map((mark) => (
                    <button
                      onClick={() => setCurrentMark(mark)}
                      className={`${currentMark === mark ? "bg-emerald-500 font-semibold" : ""} flex h-16 w-24 items-center justify-center rounded-xl border border-neutral-800/60 px-3 py-2 text-xs hover:border-neutral-800 focus-visible:border-neutral-800`}
                      key={mark}
                    >
                      {mark}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {sprintTasks.length > 0 && (
            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-800/60">
              {sprintTasks.map((task) => (
                <button
                  onClick={() => setActiveTask(task)}
                  key={task.id}
                  className="bg-red-400 text-white"
                >
                  {task.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
