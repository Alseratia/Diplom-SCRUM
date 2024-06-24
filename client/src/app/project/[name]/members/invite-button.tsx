"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { handleCreateProjectInvite } from "./actions";
import { useState } from "react";
import { Role } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const roles = ["ScrumMaster", "Executor"];

export const InviteButton = ({
  token,
  projectName,
}: {
  token: string;
  projectName: string;
}) => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState("Executor");

  const queryClient = useQueryClient();

  const { mutate: createInvite } = useMutation({
    mutationFn: handleCreateProjectInvite,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["project-invites"] });
      setOpen(false);
      setUserName("");
      setSelectedRole("Executor");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex  items-center justify-center rounded-xl border border-neutral-950/30 px-3 py-2 text-neutral-700 transition-all duration-150 hover:bg-neutral-800/30 hover:text-neutral-100">
        Добавить участника
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-10 border border-neutral-950/30 bg-neutral-200 px-8 py-6">
        <h2 className="text-3xl font-semibold text-neutral-950">
          Добавить участника
        </h2>

        <Input
          value={userName}
          onChange={(e) => setUserName(e.currentTarget.value)}
          placeholder="Имя участника"
        />
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className=" text-neutral-800">
            <SelectValue placeholder="Роль" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role} className="text-neutral-600">
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            onClick={() => {
              void createInvite({
                token,
                projectName,
                userName,
                role: selectedRole as Role,
              });
            }}
          >
            Пригласить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
