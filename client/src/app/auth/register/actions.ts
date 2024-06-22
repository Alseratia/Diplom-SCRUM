"use server";

import { BASE_URL } from "@/lib/constants";
import { createSession } from "@/lib/session";
import type { User } from "@/lib/types";

export async function handleRegister({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const name = email.split("@")[0];
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 409) {
      throw new Error("Пользователь с таким email уже существует");
    }
    throw new Error("Ошибка регистрации");
  }

  const registeredUser = (await res.json()) as User;

  const input = {
    Name: name,
    UserId: registeredUser.userId,
  };

  const temp = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!temp.ok) {
    if (temp.status === 409) {
      throw new Error("Пользователь с таким email уже существует");
    }
    throw new Error("Ошибка регистрации");
  }

  await createSession(registeredUser.userId, registeredUser.accessToken);

  return registeredUser;
}
