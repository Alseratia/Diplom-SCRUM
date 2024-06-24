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
    <header className="flex items-center justify-between border-b border-neutral-950/20  px-12 py-8">
      <Link href={"/"} className="text-black">
        LOGO
      </Link>
      <nav className="flex items-center justify-center gap-4">
        {!session ? (
          <Link
            href={"/auth/login"}
            className="text-primary-background rounded-xl px-3 py-2 font-semibold text-neutral-950 hover:bg-neutral-300/90"
          >
            Логин
          </Link>
        ) : (
          <>
            <ProfileLink session={session} />
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-neutral-950">{user.name}</span>
                <span className="rounded-full border border-neutral-950 shadow-md">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  ) : (
                    <User color="#000" />
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
