import { getSession } from "@/app/_data/session";
import { handleGetProjectDataByName } from "./actions";

export default async function ProjectPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  const session = await getSession();

  const projectData = await handleGetProjectDataByName({
    token: session!.token,
    name,
  });
  return <div className="p-4 text-white">Project {projectData.name}</div>;
}
