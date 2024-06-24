"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { handleStartProjectSprint } from "../actions";

export const StartSprintButton = ({
  token,
  sprintName,
  projectName,
}: {
  token: string;
  sprintName: string;
  projectName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | undefined>(
    new Date().toLocaleDateString(),
  );
  const [endDate, setEndDate] = useState<string | undefined>(
    new Date().toLocaleDateString(),
  );

  const { mutate: startSprint } = useMutation({
    mutationFn: handleStartProjectSprint,
    onSuccess: () => {
      setIsOpen(false);
      setStartDate(() => undefined);
      setEndDate(() => undefined);
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="rounded-xl bg-emerald-600 px-3 py-2 text-neutral-200 transition-colors duration-150 hover:bg-emerald-700 focus-visible:bg-emerald-600 ">
        Запланировать спринт
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-10 border border-neutral-950/30 bg-neutral-950 px-8 py-6">
        <h2 className="text-3xl font-semibold text-neutral-100">
          Запланировать спринт
        </h2>
        <Label className="text-white" htmlFor="date-start">
          Дата начала спринта
        </Label>
        <Input
          value={startDate}
          onChange={(e) => setStartDate(e.currentTarget.value)}
          id="date-start"
          type="date"
        />
        <Label className="text-white" htmlFor="date-end">
          Дата окончания спринта
        </Label>
        <Input
          value={endDate}
          onChange={(e) => setEndDate(e.currentTarget.value)}
          id="date-end"
          type="date"
        />
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
              setStartDate(undefined);
              setEndDate(undefined);
            }}
            variant={"destructive"}
          >
            Отмена
          </Button>
          <Button
            onClick={() =>
              void startSprint({
                token,
                sprintName,
                projectName,
                start: new Date(startDate!),
                end: new Date(endDate!),
              })
            }
          >
            Запланировать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
