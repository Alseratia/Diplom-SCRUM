import { Chart } from "./Chart";

export default function ProjectMonitoringPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  return (
    <div className="flex h-full flex-col items-center gap-36 px-12 py-6">
      <h2 className="text-center text-2xl font-semibold text-neutral-200">
        Мониторинг проекта {name}
      </h2>
      <Chart />
    </div>
  );
}
