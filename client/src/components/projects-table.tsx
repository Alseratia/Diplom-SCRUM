import { getSession } from "@/app/_data/session";
import { ProjectItem } from "./project";
import { handleGetAllUserProjects } from "@/app/project/[name]/actions";
import { CreateProject } from "./create-project";
import { redirect } from "next/navigation";
import { handleGetAllUserInvites } from "@/app/actions";
import { InviteItem } from "./invite-item";

export async function ProjectsTable({}) {
  const session = await getSession();

  if (!session) return redirect("/auth/login");

  const projects = await handleGetAllUserProjects({
    token: session.token,
  });

  const invites = await handleGetAllUserInvites({
    token: session.token,
  });

  console.log(invites);

  return (
    <div className=" flex h-full flex-col items-center justify-center gap-36">
      <h2 className="text-center text-4xl text-neutral-200">Мои проекты</h2>
      <div className="flex max-w-5xl flex-wrap items-center justify-center gap-8">
        <CreateProject token={session.token} />
        {projects &&
          projects.map((project) => (
            <ProjectItem project={project} key={project.id} />
          ))}
      </div>
      {invites && invites.length > 0 && (
        <>
          <h2 className="text-center text-4xl text-neutral-200">Приглашения</h2>
          <div className="flex max-w-5xl flex-wrap items-center justify-center gap-8">
            {invites.map((invite) => (
              <InviteItem
                invite={invite}
                token={session.token}
                key={invite.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
