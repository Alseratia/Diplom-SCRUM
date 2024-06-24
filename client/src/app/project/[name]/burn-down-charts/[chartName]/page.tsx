import { Suspense } from "react";
import { SprintChart } from "./SprintChart";

export default function SprintBurnDownChartPage({
  params,
}: {
  params: { chartName: string };
}) {
  const { chartName } = params;

  return (
    <div className="flex h-full flex-col items-center gap-12 px-12 py-6">
      <h2 className="text-center text-2xl font-semibold text-neutral-950">
        Диаграмма сгорания спринта {chartName.replaceAll("%20", " ")}
      </h2>
      <p className="max-w-3xl text-center text-neutral-600">
        Диаграмма сгорания — это график, который отображает скорость уменьшения
        объема работ в Story Points за один спринт. Диаграмма помогает ежедневно
        оценивать загрузку команды и динамику решения задач спринта.
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <SprintChart />
      </Suspense>
    </div>
  );
}
