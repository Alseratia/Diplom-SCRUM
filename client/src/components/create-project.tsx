"use client";

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { handleCreateUserProject } from "@/app/project/[name]/actions";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const CreateProject = ({ token }: { token: string }) => {
  const [projectName, setProjectName] = useState("");
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] =
    useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: handleCreateUserProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-projects"] });
      setProjectName("");
      setIsCreateProjectDialogOpen(false);
    },
  });
  return (
    <Dialog
      open={isCreateProjectDialogOpen}
      onOpenChange={setIsCreateProjectDialogOpen}
    >
      <DialogTrigger className="flex h-[70px] w-[170px] items-center justify-center rounded-xl border border-neutral-700 px-3 py-2 transition-all duration-150 hover:scale-105">
        <Plus color="#000" />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-10 border border-neutral-950/30 bg-neutral-200 px-8 py-6">
        <h2 className="text-3xl font-semibold text-neutral-950">
          Создать новый проект
        </h2>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.currentTarget.value)}
          placeholder="Новый проект"
        />
        <DialogFooter>
          <Button
            onClick={() => {
              void mutate({ projectName, token });
            }}
          >
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
