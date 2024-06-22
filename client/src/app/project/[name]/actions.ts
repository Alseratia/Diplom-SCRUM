"use server";

import { BASE_URL } from "@/lib/constants";
import type { Project } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function handleGetAllUserProjects({ token }: { token: string }) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка получения проектов");

  return (await res.json()) as Project[];
}

export async function handleGetProjectDataByName({
  token,
  name,
}: {
  token: string;
  name: string;
}) {
  const res = await fetch(`${BASE_URL}/projects/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка получения проекта");

  return (await res.json()) as Project;
}

export async function handleCreateUserProject({
  token,
  projectName,
  projectAvatar,
}: {
  token: string;
  projectName: string;
  projectAvatar?: string | null;
}) {
  const input = {
    Name: projectName,
    Avatar: projectAvatar,
  };
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error("Ошибка создания проекта");

  revalidatePath("/");

  return;
}

export async function handleDeleteUserProject({
  token,
  projectName,
}: {
  token: string;
  projectName: string;
}) {
  const res = await fetch(`${BASE_URL}/projects/${projectName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка удаления проекта");

  return;
}
