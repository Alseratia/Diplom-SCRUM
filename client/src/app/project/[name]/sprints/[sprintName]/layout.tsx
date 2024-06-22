import { getSession } from "@/app/_data/session";
import { TasksSidebar } from "./tasks-sidebar";
import {
  handleGetAllProjectUserStories,
  handleGetAllSprintUserStories,
} from "../../backlog/actions";
import { handleGetProjectSprint } from "./actions";
import { handleGetUser } from "@/lib/handlers";

export default async function SprintLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string; sprintName: string };
}) {
  const { name, sprintName } = params;

  const session = await getSession();

  const userInfo = await handleGetUser({ token: session!.token });

  const tasks = await handleGetAllProjectUserStories({
    projectName: name,
    token: session!.token,
  });

  const sprintTasks = await handleGetAllSprintUserStories({
    token: session!.token,
    projectName: name,
    sprintName,
  });

  const sprintInfo =
    session &&
    (await handleGetProjectSprint({
      token: session!.token,
      projectName: name,
      sprintName,
    }));

  return (
    <div
      className={`${tasks.length > 0 ? "grid-cols-[1fr,minmax(20%,25rem)]" : ""} grid h-full`}
    >
      {children}
      {session && tasks.length > 0 && userInfo && sprintInfo && (
        <TasksSidebar
          projectTasks={tasks}
          sprintTasks={sprintTasks}
          session={session}
          userInfo={userInfo}
          projectName={name}
          sprintName={sprintName}
          sprintInfo={sprintInfo}
        />
      )}
    </div>
  );
}

// planning / pocker-planning
