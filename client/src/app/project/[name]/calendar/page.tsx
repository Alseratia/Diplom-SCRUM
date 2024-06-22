import { Calendar } from "@/components/ui/calendar";
import { CalendarContent } from "./content";

export default function ProjectCalendarPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  return (
    <div className="flex flex-col items-center gap-48 px-12 py-8">
      <h2 className="text-2xl font-semibold text-neutral-200">
        Project Calendar {name}
      </h2>
      <CalendarContent />
    </div>
  );
}
