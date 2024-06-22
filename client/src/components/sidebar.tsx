"use client";
import { handleGetProjectDataByName } from "@/app/project/[name]/actions";
import { AuthContext } from "@/app/providers";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useContext } from "react";

const sidebarItems = [
  {
    name: "Настройки проекта",
    link: "settings",
    isAvailableForExecutors: false,
  },
  { name: "Участники", link: "members", isAvailableForExecutors: false },
  { name: "Календарь", link: "calendar", isAvailableForExecutors: true },
  { name: "Бэклог проекта", link: "backlog", isAvailableForExecutors: false },
  { name: "Спринты", link: "sprints", isAvailableForExecutors: true },
  { name: "Чат", link: "chat", isAvailableForExecutors: true },
  { name: "Мониторинг", link: "monitoring", isAvailableForExecutors: false },
  {
    name: "Диаграммы сгорания",
    link: "burn-down-charts",
    isAvailableForExecutors: false,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { name } = useParams();
  const { user } = useContext(AuthContext);

  const { data: projectData } = useQuery({
    queryKey: ["project"],
    queryFn: () =>
      handleGetProjectDataByName({
        token: user!.accessToken,
        name: name as string,
      }),
    enabled: !!user,
  });

  const filteredItems = sidebarItems.filter((item) => {
    if (projectData?.role !== "Executor") return true;

    return item.isAvailableForExecutors;
  });

  return (
    <div className="border-r border-neutral-800/60 px-8 py-6">
      <ul className="grid gap-4">
        {filteredItems.map((item) => (
          <Link
            key={item.name}
            href={`/project/${name}/${item.link}`}
            className={`${pathname.includes(item.link) ? "outline outline-1 outline-neutral-800" : ""} rounded-xl px-3 py-2 text-neutral-200 transition-colors duration-150 hover:text-neutral-300 hover:outline hover:outline-1 hover:outline-offset-1 hover:outline-neutral-800/60`}
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};
