"use client";

import { useState, type DragEvent } from "react";
import { Trash, FlameIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeleteProjectUserStory } from "@/app/project/[name]/backlog/actions";

export const BurnBarrel = ({
  projectName,
  token,
}: {
  projectName: string;
  token: string;
}) => {
  const [active, setActive] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteSprintUserStory } = useMutation({
    mutationFn: handleDeleteProjectUserStory,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["user-stories"],
      });
      setActive(false);
    },
  });

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    setActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    deleteSprintUserStory({
      storyId: cardId,
      token,
      projectName,
    });
  };

  return (
    <div
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      className={`${active ? "border-red-800 bg-red-800/20 text-red-500" : "border-neutral-950/30 bg-neutral-900/30 text-neutral-500"} mt-[54px] grid size-56 shrink-0 place-content-center rounded-xl border text-3xl`}
    >
      {active ? <FlameIcon className="animate-bounce" /> : <Trash />}
    </div>
  );
};
