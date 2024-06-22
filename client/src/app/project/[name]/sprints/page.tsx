import { getSession } from "@/app/_data/session";
import { SprintsTable } from "./sprints-table";

export default async function ProjectSprintsPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  const session = await getSession();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-36">
      <h2 className="text-center text-2xl font-semibold text-neutral-200">
        {name} sprints
      </h2>
      {session && <SprintsTable projectName={name} token={session.token} />}
    </div>
  );
}
