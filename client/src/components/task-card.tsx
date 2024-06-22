import { motion } from "framer-motion";
import { DropIndicator } from "@/components/ui/drop-indicator";
import { useState, type DragEvent } from "react";
import type { StoryTask, UserStory } from "@/lib/types";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Settings, X } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleCreateStoryTask,
  handleDeleteStoryTask,
} from "@/app/project/[name]/backlog/actions";
import { useParams } from "next/navigation";

type CardProps = {
  token: string;
  title: string;
  column: string;
  id: string;
  tasks: StoryTask[];
  handleDragStart: ({
    card,
    e,
  }: {
    card: UserStory;
    e: DragEvent<HTMLDivElement>;
  }) => void;
};

export const TaskCard = ({
  token,
  title,
  column,
  id,
  handleDragStart,
  tasks,
}: CardProps) => {
  const { name } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const queryClient = useQueryClient();

  const { mutate: addTask } = useMutation({
    mutationFn: handleCreateStoryTask,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["user-stories"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["sprint-user-stories"],
      });
      setInput("");
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: handleDeleteStoryTask,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["user-stories"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["sprint-user-stories"],
      });
      setInput("");
    },
  });

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        draggable="true"
        layout
        layoutId={id}
        //@ts-expect-error
        onDragStart={(e) => handleDragStart({ e, card: { title, column, id } })}
        className="flex cursor-grab items-center justify-between rounded-xl border border-neutral-800/60 bg-neutral-900/30 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-300">{title}</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Settings color="#cacaca" size={20} />
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-10 border border-neutral-800/60 bg-neutral-950 px-8 py-6">
            <h2 className="text-xl font-semibold text-neutral-300">
              Ивенты задачи <span className="text-neutral-200">{title}</span>
            </h2>
            {tasks.map((task) => (
              <ul key={task.id} className="flex items-center gap-2">
                <li className="flex w-full items-center justify-between gap-4 text-neutral-300">
                  <div className="flex items-center justify-center gap-2">
                    <Checkbox />
                    <span>{task.title}</span>
                  </div>
                  <button
                    onClick={() => {
                      void deleteTask({
                        projectName: name as string,
                        storyId: id,
                        token,
                        taskId: task.id,
                      });
                    }}
                    className="transition-transform duration-150 hover:scale-105 focus-visible:scale-105 "
                  >
                    <X color="#FF0000" />
                  </button>
                </li>
              </ul>
            ))}
            <div className="flex w-full gap-4 border-t border-neutral-800/60 p-6">
              <Input
                placeholder="Название задачи"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                className="text-neutral-950"
              />
              <Button
                onClick={() => {
                  void addTask({
                    title: input,
                    storyId: id,
                    projectName: name as string,
                    token,
                  });
                }}
              >
                Добавить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  );
};
