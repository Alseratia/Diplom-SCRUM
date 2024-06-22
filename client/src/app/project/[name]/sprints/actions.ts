"use server";

import { BASE_URL } from "@/lib/constants";
import { ProjectSprint } from "@/lib/types";

export async function handleGetAllProjectSprints({
  token,
  projectName,
}: {
  token: string;
  projectName: string;
}) {
  const res = await fetch(`${BASE_URL}/projects/${projectName}/sprints`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка получения спринтов");

  return (await res.json()) as ProjectSprint[];
}

export async function handleCreateProjectSprint({
  token,
  projectName,
  sprintName,
}: {
  token: string;
  projectName: string;
  sprintName: string;
}) {
  const res = await fetch(`${BASE_URL}/projects/${projectName}/sprints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ Name: sprintName }),
  });

  if (!res.ok) throw new Error("Ошибка создания спринта");

  return;
}

export async function handleDeleteProjectSprint({
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
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Ошибка удаления спринта");

  return;
}

export async function handleStartProjectSprint({
  token,
  projectName,
  sprintName,
  start,
  end,
}: {
  token: string;
  projectName: string;
  sprintName: string;
  start: Date;
  end: Date;
}) {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/sprints/${sprintName}/start`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Start: `${start.toISOString()}`,
        End: `${end.toISOString()}`,
      }),
    },
  );

  if (!res.ok) throw new Error("Ошибка запуска спринта");

  return (await res.json()) as ProjectSprint;
}
