import { getSession } from "@/app/_data/session";
import { InviteButton } from "./invite-button";
import { Members } from "./members";
import { PendingInvitesList } from "./pending-invites-list";

export default async function ProjectMembersPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const session = await getSession();

  return (
    <div className="flex flex-col gap-16 px-12 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-center text-2xl font-semibold text-neutral-950">
          Участники проекта {name}
        </h2>
        {session && <InviteButton token={session.token} projectName={name} />}
      </div>
      {session && (
        <>
          <Members token={session.token} projectName={name as string} />
          <PendingInvitesList
            token={session.token}
            projectName={name as string}
          />
        </>
      )}
    </div>
  );
}
