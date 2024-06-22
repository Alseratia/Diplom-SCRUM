"use server";

import { getSession } from "@/app/_data/session";
import { BASE_URL } from "@/lib/constants";
import { createSession } from "@/lib/session";
import type { User } from "@/lib/types";

export async function handleLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка авторизации");
  }

  const user = (await res.json()) as User;

  const session = await getSession();

  if (!session) {
    await createSession(user.userId, user.accessToken);
  }

  return user;
}
