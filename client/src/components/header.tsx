import Link from "next/link";
import { ProfileLink } from "./ui/profile-link";
import { getSession } from "@/app/_data/session";
import { handleGetUser } from "@/lib/handlers";
import { User } from "lucide-react";
import Image from "next/image";

export const Header = async ({}) => {
  const session = await getSession();

  const user = session && (await handleGetUser({ token: session!.token }));

  return (
    <header className="flex items-center justify-between border-b-[1px] border-neutral-800/60 px-12 py-8">
      <Link href={"/"} className="text-white">
        LOGO
      </Link>
      <nav className="flex items-center justify-center gap-4">
        {!session ? (
          <Link
            href={"/auth/login"}
            className="text-primary-background rounded-xl bg-neutral-300 px-3 py-2 font-semibold hover:bg-neutral-300/90"
          >
            Логин
          </Link>
        ) : (
          <>
            <ProfileLink session={session} />
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-white">{user.name}</span>
                <span className="rounded-full border border-white">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  ) : (
                    <User color="#FFFFFF" />
                  )}
                </span>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
};
