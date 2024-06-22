import { getSession } from "@/app/_data/session";
import { Chat } from "./Chat";
import { redirect } from "next/navigation";
import { handleGetUser } from "@/lib/handlers";

export default async function ProjectChatPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  const session = await getSession();

  if (!session) redirect("/auth/login");

  const user = await handleGetUser({ token: session.token });

  return (
    <div className="flex h-full flex-col items-center gap-16 px-12 py-6">
      <h2 className="text-center text-2xl font-semibold text-neutral-200">
        Чат проекта {name}
      </h2>
      {session && <Chat projectName={name} session={session} user={user} />}
    </div>
  );
}
