import { getSession } from "@/app/_data/session";
import { redirect } from "next/navigation";
import { handleGetAllProjectSprints } from "../sprints/actions";
import { Suspense } from "react";
import Link from "next/link";

export default async function ProjectBurnDownChartsPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  const session = await getSession();

  if (!session) redirect("auth/login");

  const sprints = await handleGetAllProjectSprints({
    token: session.token,
    projectName: name,
  });

  return (
    <div className="flex h-full flex-col items-center justify-center gap-36 px-12 py-6">
      <h2 className="text-center text-2xl font-semibold text-neutral-200">
        Графики сгорания проекта {name}
      </h2>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex max-w-5xl flex-wrap items-center justify-center gap-8">
          {sprints &&
            sprints.map((sprint) => (
              <Link
                key={sprint.id}
                href={`/project/${name}/burn-down-charts/${sprint.name}`}
                className="flex h-[70px] w-[170px] items-center justify-center rounded-xl border border-neutral-700 px-3 py-2 transition-all duration-150 hover:scale-105"
              >
                {sprint.name}
              </Link>
            ))}
        </div>
      </Suspense>
    </div>
  );
}
