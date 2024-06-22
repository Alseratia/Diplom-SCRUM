"use server";

import { BASE_URL } from "@/lib/constants";
import type { UserInvite } from "@/lib/types";

export async function handleGetAllUserInvites({ token }: { token: string }) {
  const res = await fetch(`${BASE_URL}/users/invites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка перемещения истории");

  return (await res.json()) as UserInvite[];
}

export async function handleAcceptUserInvite({
  token,
  inviteId,
}: {
  token: string;
  inviteId: string;
}) {
  const res = await fetch(`${BASE_URL}/users/invites/${inviteId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка ппринятия инвайта");

  return;
}

export async function handleRejectUserInvite({
  token,
  inviteId,
}: {
  token: string;
  inviteId: string;
}) {
  const res = await fetch(`${BASE_URL}/users/invites/${inviteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка отклонения инвайта");

  return;
}
