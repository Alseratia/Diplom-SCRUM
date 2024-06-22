"use server";

import { BASE_URL } from "@/lib/constants";
import type { ProjectSprint } from "@/lib/types";

export async function handleGetProjectSprint({
  token,
  projectName,
  sprintName,
}: {
  token: string;
  projectName: string;
  sprintName: string;
}) {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/sprints/${sprintName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Ошибка получения спринта");

  return (await res.json()) as ProjectSprint;
}
