"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export const CalendarContent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const tasks = [
    { name: "Пойти нахуй", start: "17:00", end: "18:00" },
    { name: "Уволиться", start: "18:00", end: "19:00" },
  ];
  return (
    <div className="flex gap-10">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border border-neutral-800/60"
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-lg">События на {date?.toLocaleDateString()}</h3>
        {tasks.map((task) => (
          <div
            key={task.name}
            className="flex w-[300px] items-center justify-between"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="size-4 rounded-full bg-neutral-200"></div>
              <div className="text-sm">{task.name}</div>
            </div>
            <div className="italic text-neutral-400">
              {task.start} - {task.end}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
