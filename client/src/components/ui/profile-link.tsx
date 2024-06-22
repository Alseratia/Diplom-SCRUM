"use client";
import { AuthContext } from "@/app/providers";
import { useContext, useEffect, useState } from "react";
import { Button } from "./button";
import { Bell } from "lucide-react";
import type { Session, WSNotification } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  handleGetAllUserNotifications,
  handleMarkAllNotificationsAsRead,
} from "@/lib/handlers";

export const ProfileLink = ({ session }: { session: NonNullable<Session> }) => {
  const [newNotifications, setNewNotifications] = useState<WSNotification[]>(
    [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const { notificationsConnection } = useContext(AuthContext);

  const { data: userNotifications } = useQuery({
    queryKey: ["user-notifications"],
    queryFn: () =>
      handleGetAllUserNotifications({
        userId: session.userId,
        token: session.token,
      }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: markAllNotificationsAsRead } = useMutation({
    mutationFn: handleMarkAllNotificationsAsRead,
    onSuccess: () => {
      setNewNotifications([]);
    },
  });

  useEffect(() => {
    if (userNotifications) {
      setNewNotifications(userNotifications);
    }
  }, [userNotifications]);

  if (session) {
    notificationsConnection.on(
      "NewNotification",
      (notification: WSNotification) => {
        setNewNotifications([...newNotifications, notification]);
      },
    );
  }

  return (
    <>
      <Button
        variant={"link"}
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-xl bg-transparent px-3 py-2 font-semibold text-neutral-200 hover:text-neutral-400 focus-visible:text-neutral-400"
      >
        {newNotifications.length > 0 && (
          <span className="absolute right-2 top-1 flex size-4 items-center justify-center rounded-full border border-neutral-100 bg-red-400 p-2">
            {newNotifications.length}
          </span>
        )}
        <Bell />
      </Button>
      {isOpen && (
        <div className="absolute right-14 top-14 z-30 flex max-h-[700px] w-[350px] flex-col items-center gap-4 rounded-xl border border-neutral-800/60 bg-neutral-950 p-3">
          {newNotifications.length > 0 ? (
            <>
              <div className="hidden-scrollbar max-h-[600px] space-y-2 overflow-y-scroll">
                {newNotifications.map((notification, idx) => (
                  <div
                    key={idx}
                    className={`${notification.isRead ? "bg-transparent" : "bg-neutral-800"} flex w-full cursor-default flex-col items-start gap-3 rounded-xl border border-neutral-800/60  px-3 py-2 text-neutral-200`}
                  >
                    <div className="flex items-center justify-center gap-20">
                      <span className="text-xs font-semibold">
                        {notification.title}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-balance text-sm text-neutral-300">
                      {notification.message}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant={"outline"}
                onClick={() =>
                  void markAllNotificationsAsRead({
                    userId: session.userId,
                    token: session.token,
                  })
                }
                className="z-50 w-full bg-neutral-200 font-semibold"
              >
                Очистить уведомления
              </Button>
            </>
          ) : (
            <div className="text-neutral-200">Нет новых уведомлений</div>
          )}
        </div>
      )}
    </>
  );
};
