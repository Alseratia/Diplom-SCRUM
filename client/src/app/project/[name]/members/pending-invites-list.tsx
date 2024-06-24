"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleDeleteProjectInvite, handleGetProjectInvites } from "./actions";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const PendingInvitesList = ({
  token,
  projectName,
}: {
  token: string;
  projectName: string;
}) => {
  const queryClient = useQueryClient();

  const { data: invites } = useQuery({
    queryKey: ["project-invites"],
    queryFn: () => handleGetProjectInvites({ token, projectName }),
  });

  const { mutate: deleteInvite } = useMutation({
    mutationFn: handleDeleteProjectInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-invites"] });
    },
  });
  return (
    <>
      {invites && invites.length > 0 && (
        <div className="flex flex-col gap-10 text-white">
          <h2 className="text-2xl font-semibold text-neutral-950">
            Приглашенные участники
          </h2>
          {invites.map((invite) => (
            <div
              key={invite.userName}
              className="flex items-center justify-between border-b border-neutral-950/30 py-2"
            >
              <div className="flex items-center gap-2 text-neutral-700">
                <span className="rounded-full border border-white">
                  {invite.userAvatar ? (
                    <Image
                      src={invite.userAvatar}
                      alt={invite.userName}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  ) : (
                    <User />
                  )}
                </span>
                <span>{invite.userName}</span>
              </div>
              <div className="flex items-center justify-center gap-10">
                <div className="text-neutral-500">{invite.role}</div>
                <Button
                  variant={"destructive"}
                  onClick={() =>
                    deleteInvite({ token, projectName, inviteId: invite.id })
                  }
                >
                  Отозвать приглашение
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
