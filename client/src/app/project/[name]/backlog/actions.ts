"use server";

import { BASE_URL } from "@/lib/constants";
import type { Priority, UserStory } from "@/lib/types";

export async function handleGetAllProjectUserStories({
  token,
  projectName,
}: {
  token: string;
  projectName: string;
}) {
  const res = await fetch(`${BASE_URL}/projects/${projectName}/user-stories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка получения проектов");

  return (await res.json()) as UserStory[];
}

export async function handleCreateUserStory({
  token,
  projectName,
  title,
  text,
  priority,
}: {
  token: string;
  projectName: string;
  title: string;
  text: string;
  priority: Priority;
}) {
  const res = await fetch(`${BASE_URL}/projects/${projectName}/user-stories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      Title: `${title}`,
      Text: `${text}`,
      Priority: `${priority}`,
    }),
  });

  if (!res.ok) throw new Error("Ошибка создания истории");

  return (await res.json()) as UserStory;
}

export async function handleDeleteProjectUserStory({
  token,
  projectName,
  storyId,
}: {
  token: string;
  projectName: string;
  storyId: string;
}) {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/user-stories/${storyId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Ошибка удаления истории");
}

export async function handleGetAllSprintUserStories({
  token,
  projectName,
  sprintName,
}: {
  token: string;
  projectName: string;
  sprintName: string;
}) {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/sprints/${sprintName}/user-stories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Ошибка получения проектов");

  return (await res.json()) as UserStory[];
}

export async function handleMoveUserStoryToSprint({
  token,
  projectName,
  sprintName,
  userStoryId,
}: {
  token: string;
  projectName: string;
  sprintName: string;
  userStoryId: string;
}) {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/sprints/${sprintName}/user-stories/${userStoryId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Ошибка перемещения истории");

  return;
}

export async function handleCreateStoryTask({
  token,
  projectName,
  storyId,
  title,
}: {
  token: string;
  projectName: string;
  storyId: string;
  title: string;
}) {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/user-stories/${storyId}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        text: title,
      }),
    },
  );

  if (!res.ok) throw new Error("Ошибка срздания подзадачи в истории");

  return;
}

export async function handleDeleteStoryTask({
  token,
  projectName,
  storyId,
  taskId,
}: {
  token: string;
  projectName: string;
  storyId: string;
  taskId: string;
}) {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/user-stories/${storyId}/tasks/${taskId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Ошибка удаления подзадачи из истории");

  return;
}
