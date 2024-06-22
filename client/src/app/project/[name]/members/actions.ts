"use server";

import { BASE_URL } from "@/lib/constants";
import type { Invite, Member, Role } from "@/lib/types";

export async function handleGetProjectMembers({
  token,
  projectName,
}: {
  token: string;
  projectName: string;
}) {
  const res = await fetch(`${BASE_URL}/projects/${projectName}/members`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка получения пользователей");

  return (await res.json()) as Member[];
}

export async function handleDeleteProjectMember({
  token,
  projectName,
  memberId,
}: {
  token: string;
  projectName: string;
  memberId: string;
}) {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/members/${memberId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Ошибка удаления пользователя");

  return;
}

export async function handleGetProjectInvites({
  token,
  projectName,
}: {
  token: string;
  projectName: string;
}) {
  const res = await fetch(`${BASE_URL}/projects/${projectName}/invites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка получения приглашений");

  return (await res.json()) as Invite[];
}

export async function handleCreateProjectInvite({
  token,
  projectName,
  userName,
  role,
}: {
  token: string;
  projectName: string;
  userName: string;
  role: Role;
}) {
  const body = {
    UserName: userName,
    UserRole: role,
  };
  const res = await fetch(`${BASE_URL}/projects/${projectName}/invites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Ошибка создания приглашения");

  return;
}

export async function handleDeleteProjectInvite({
  token,
  projectName,
  inviteId,
}: {
  token: string;
  projectName: string;
  inviteId: string;
}) {
  const res = await fetch(
    `${BASE_URL}/projects/${projectName}/invites/${inviteId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error("Ошибка удаления приглашения");

  return;
}
