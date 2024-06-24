"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Message, Session, UserData } from "@/lib/types";
import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Chat = ({
  projectName,
  session,
  user,
}: {
  projectName: string;
  session: Session;
  user: UserData;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages([
      {
        createdAt: new Date(),
        text: "...",
        userId: "1",
      },
      { createdAt: new Date(), text: "qq", userId: "2" },
      { createdAt: new Date(), text: "Privet", userId: "1" },
      { createdAt: new Date(), text: "Poka", userId: user.userId },
    ]);
  }, [projectName]);
  return (
    <div className="flex h-full w-4/5 flex-col rounded-xl border border-neutral-950/30 shadow-sm">
      {/* messages */}
      <div className="flex-1">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`${message.userId !== user.userId ? "" : "items-end"} flex flex-col gap-4 p-6`}
          >
            <div className="flex items-center gap-4">
              {/* avatar */}
              <span className="rounded-full border border-black shadow-md">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt={user.name}
                  />
                ) : (
                  <span>
                    <User color="#000" size={40} />
                  </span>
                )}
              </span>
              {/* text */}
              <p
                className={`${message.userId !== user.userId ? "bg-neutral-800 text-neutral-200" : "bg-neutral-200 text-neutral-800"} rounded-xl  px-3 py-2`}
              >
                {message.text}
              </p>
            </div>
            {/* time */}
            <span className="text-xs text-neutral-400">
              {message.createdAt.toLocaleString()}
              {/* {message.userId} */}
            </span>
          </div>
        ))}
      </div>
      <div className="flex w-full gap-4 border-t border-neutral-950/30 p-6">
        <Input
          placeholder="Введите сообщение"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          className="text-neutral-950"
        />
        <Button>Отправить</Button>
      </div>
    </div>
  );
};
