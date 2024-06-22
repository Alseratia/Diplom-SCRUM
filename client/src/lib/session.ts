import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode("secret");

export async function encrypt(payload: JWTPayload | undefined) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10days")
    .sign(key);
}

export async function decrypt(session: any) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

const cookie = {
  name: "diplom-session",
  duration: 24 * 60 * 60 * 1000,
};

export async function createSession(userId: string, token: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, token, expires });

  cookies().set({
    name: cookie.name,
    value: session,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires,
  });
  //redirect("/");
}

export async function verifySession() {
  const tokenCookie = cookies().get(cookie.name)?.value;
  const session = await decrypt(tokenCookie);

  if (!session?.token) return null;

  return { token: session.token, userId: session.userId };
}
