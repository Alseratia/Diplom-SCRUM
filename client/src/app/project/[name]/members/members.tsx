"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { handleDeleteProjectMember, handleGetProjectMembers } from "./actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { User } from "lucide-react";

export const Members = ({
  token,
  projectName,
}: {
  token: string;
  projectName: string;
}) => {
  const [input, setInput] = useState("");

  const queryClient = useQueryClient();

  const { data: members } = useQuery({
    queryKey: ["project-members"],
    queryFn: () => handleGetProjectMembers({ token: token, projectName }),
  });

  const { mutate: deleteMember } = useMutation({
    mutationFn: handleDeleteProjectMember,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["project-members"] });
    },
  });

  const filteredMembers =
    members &&
    members.filter((member) => {
      if (input === "") return true;

      return member.name.toLowerCase().includes(input.toLowerCase());
    });

  return (
    <div className="flex flex-col gap-10">
      <Input
        className="text-neutral-950"
        placeholder="Имя участника"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />

      {filteredMembers &&
        filteredMembers.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between border-b border-neutral-800/60 py-2"
          >
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="rounded-full border border-white">
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                ) : (
                  <User />
                )}
              </span>
              <span>{member.name}</span>
            </div>
            <div className="flex items-center justify-center gap-10">
              <div className="text-neutral-200">{member.role}</div>
              <Button
                variant={"destructive"}
                onClick={() =>
                  void deleteMember({
                    token: token,
                    projectName,
                    memberId: member.id,
                  })
                }
              >
                Выгнать
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};
