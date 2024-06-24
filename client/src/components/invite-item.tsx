"use client";

import type { UserInvite } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import { Activity } from "lucide-react";
import { Button } from "./ui/button";
import { handleAcceptUserInvite, handleRejectUserInvite } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const InviteItem = ({
  invite,
  token,
}: {
  invite: UserInvite;
  token: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: acceptInvite } = useMutation({
    mutationFn: handleAcceptUserInvite,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["user-invites"] });
      setIsOpen(false);
      router.refresh();
    },
  });

  const { mutate: rejectInvite } = useMutation({
    mutationFn: handleRejectUserInvite,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["user-invites"] });
      setIsOpen(false);
      router.refresh();
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="grid h-[70px] w-[170px] place-content-center rounded-xl border border-neutral-700 px-3 py-2 text-neutral-950 transition-all duration-150 hover:scale-105">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-neutral-950">
            {invite.projectAvatar ? (
              <Image
                src={invite.projectAvatar}
                alt={invite.projectName}
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <Activity color="#000" />
            )}
          </span>
          {invite.projectName}
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-10 border border-neutral-950/30 bg-neutral-200 px-8 py-6">
        <h3 className="text-md overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-neutral-950">
          Приглашение в проект {invite.projectName}
        </h3>
        <span className="text-sm text-neutral-700">
          Ваша роль в проекте:{" "}
          <span className=" text-black underline decoration-black underline-offset-2">
            {invite.role}
          </span>
        </span>
        <DialogFooter>
          <Button
            onClick={() => void rejectInvite({ token, inviteId: invite.id })}
            variant={"destructive"}
          >
            Отклонить
          </Button>
          <Button
            onClick={() => void acceptInvite({ token, inviteId: invite.id })}
            className="w-[102px]"
          >
            Принять
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
