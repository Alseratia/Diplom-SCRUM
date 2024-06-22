import { getSession } from "@/app/_data/session";
import { Board } from "@/components/board";
import { redirect } from "next/navigation";

export default async function ProjectBacklogPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  const session = await getSession();

  if (!session) return redirect("/");

  return (
    <div className="flex h-full flex-col gap-12 px-12 py-6">
      <h2 className="text-center text-2xl font-semibold text-neutral-200">
        Бэклог {name.replaceAll("%20", " ")}
      </h2>
      <span className="text-center text-xl font-medium text-neutral-300">
        Приоритет
      </span>
      <Board projectName={name} token={session.token} />
    </div>
  );
}
