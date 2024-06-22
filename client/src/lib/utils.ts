import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const USER_LOCAL_STORAGE_KEY = "USER";

export function saveUser(user: User): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): User | undefined {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
