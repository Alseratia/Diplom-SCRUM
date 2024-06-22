"use server";

import type { UserData, WSNotification } from "@/lib/types";

import { BASE_URL } from "@/lib/constants";

export async function handleGetAllUserNotifications({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {
  if (!userId) {
    throw new Error("Не указан userId");
  }

  const res = await fetch(`${BASE_URL}/notifications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [] as WSNotification[];
  const result = await res.json();
  console.log(result);
  return result as WSNotification[];
}

export async function handleMarkAllNotificationsAsRead({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {
  if (!userId) {
    throw new Error("Не указан userId");
  }

  const res = await fetch(`${BASE_URL}/notifications`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка чтения уведомлений");
}

export async function handleGetUser({ token }: { token: string }) {
  if (!token) {
    throw new Error("Не указан user");
  }

  const res = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка получения пользователя");

  return (await res.json()) as UserData;
}
