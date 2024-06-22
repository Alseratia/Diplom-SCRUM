import { getSession } from "@/app/_data/session";
import { SprintBoard } from "@/components/sprint-board";
import { StartSprintButton } from "./start-sprint-button";
import { handleGetProjectSprint } from "./actions";
import { PockerPlanningButton } from "./pocker-planning-button";

export default async function ProjectSprintPage({
  params,
}: {
  params: { sprintName: string; name: string };
}) {
  const { sprintName, name } = params;

  const session = await getSession();

  const sprintInfo =
    session &&
    (await handleGetProjectSprint({
      token: session.token,
      projectName: name,
      sprintName,
    }));

  return (
    <div className="flex h-full flex-col gap-12 px-12  py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-neutral-200">
          Спринт {sprintName.replaceAll("%20", " ")}
        </h2>
        <div className="flex items-center justify-center gap-4">
          {session && sprintInfo && !sprintInfo.start && (
            // sprintInfo.status === "WaitStart" &&
            <StartSprintButton
              token={session.token}
              projectName={name}
              sprintName={sprintName}
            />
          )}
          {session && (
            // sprintInfo?.status === "Planning" &&
            <PockerPlanningButton />
          )}
        </div>
      </div>
      {session && (
        <SprintBoard
          projectName={name}
          sprintName={sprintName}
          token={session.token}
        />
      )}
    </div>
  );
}
