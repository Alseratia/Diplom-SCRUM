import type { FC } from "react";
import type { Project } from "@/lib/types";
import Link from "next/link";

type ProjectProps = {
  project: Project;
};

export const ProjectItem: FC<ProjectProps> = ({ project }) => {
  return (
    <Link
      href={`/project/${project.name}`}
      className="flex h-[70px] w-[170px] flex-col justify-between rounded-xl border border-neutral-700 px-3 py-2 transition-all duration-150 hover:scale-105"
    >
      <h3 className="text-md max-w-36 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-neutral-800">
        {project.name}
      </h3>
      <span className="text-sm text-neutral-500">{project.role}</span>
    </Link>
  );
};
