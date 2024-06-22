"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  handleCreateProjectSprint,
  handleGetAllProjectSprints,
} from "./actions";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SprintsTable = ({
  projectName,
  token,
}: {
  projectName: string;
  token: string;
}) => {
  const queryClient = useQueryClient();

  const [sprintName, setSprintName] = useState("");
  const [isCreateSprintDialogOpen, setIsCreateSprintDialogOpen] =
    useState(false);

  const { data: sprints, isLoading } = useQuery({
    queryKey: ["sprints"],
    queryFn: () => handleGetAllProjectSprints({ projectName, token }),
  });

  const { mutate: createSprint } = useMutation({
    mutationFn: handleCreateProjectSprint,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sprints"] });
      setSprintName("");
      setIsCreateSprintDialogOpen(false);
    },
  });

  if (!token) return <div>No user</div>;

  if (isLoading) return <div className="text-white">Loading...</div>;
  return (
    <>
      <div className="flex max-w-5xl flex-wrap items-center justify-center gap-8">
        <Dialog
          open={isCreateSprintDialogOpen}
          onOpenChange={setIsCreateSprintDialogOpen}
        >
          <DialogTrigger className="flex h-[70px] w-[170px] items-center justify-center rounded-xl border border-neutral-700 px-3 py-2 transition-all duration-150 hover:scale-105">
            <Plus color="#FFFFFF" />
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-10 border border-neutral-800/60 bg-neutral-950 px-8 py-6">
            <h2 className="text-3xl font-semibold text-neutral-100">
              Создать новый спринт
            </h2>
            <Input
              value={sprintName}
              onChange={(e) => setSprintName(e.currentTarget.value)}
              placeholder="Новый спринт"
            />
            <DialogFooter>
              <Button
                onClick={() => {
                  void createSprint({
                    projectName,
                    token,
                    sprintName,
                  });
                }}
              >
                Создать
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {sprints &&
          sprints.map((sprint) => (
            <Link
              key={sprint.id}
              href={`/project/${projectName}/sprints/${sprint.name}`}
              className="flex h-[70px] w-[170px] items-center justify-center rounded-xl border border-neutral-700 px-3 py-2 transition-all duration-150 hover:scale-105"
            >
              {sprint.name}
            </Link>
          ))}
      </div>
    </>
  );
};
