import { ReactNode } from "react";
import Link from "next/link";
import { getSession } from "./_data/session";

export const PageContent = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const session = getSession();

  return (
    <>
      {!session ? (
        <div className="grid h-full place-content-center">
          <Link
            href={"/auth/login"}
            className="rounded-md border border-neutral-800/60 px-10 py-6 text-neutral-200"
          >
            Авторизоваться
          </Link>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
