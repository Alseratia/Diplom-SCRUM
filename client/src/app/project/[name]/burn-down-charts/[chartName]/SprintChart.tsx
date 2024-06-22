"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  {
    date: "2024-06-21",
    expectedTasksLeft: 20,
    realTasksLeft: 20,
  },
  {
    date: "2024-06-22",
    expectedTasksLeft: 18,
    realTasksLeft: 19,
  },
  {
    date: "2024-06-23",
    expectedTasksLeft: 16,
    realTasksLeft: 18,
  },
  {
    date: "2024-06-24",
    expectedTasksLeft: 14,
    realTasksLeft: 17,
  },
  {
    date: "2024-06-25",
    expectedTasksLeft: 12,
    realTasksLeft: 14,
  },
  {
    date: "2024-06-26",
    expectedTasksLeft: 10,
    realTasksLeft: 10,
  },
  {
    date: "2024-06-27",
    expectedTasksLeft: 8,
    realTasksLeft: 9,
  },
  {
    date: "2024-06-28",
    expectedTasksLeft: 6,
    realTasksLeft: 9,
  },
  {
    date: "2024-06-29",
    expectedTasksLeft: 4,
    realTasksLeft: 7,
  },
  {
    date: "2024-06-30",
    expectedTasksLeft: 2,
    realTasksLeft: 6,
  },
  {
    date: "2024-07-01",
    expectedTasksLeft: 0,
    realTasksLeft: 4,
  },
];

export const SprintChart = ({}) => {
  return (
    <div className="flex items-center justify-center gap-10">
      <Card className="border-neutral-800/60 bg-neutral-800 text-white">
        <CardHeader className=" text-center font-semibold ">
          Количество оставшихся Story Points
        </CardHeader>
        <CardContent className="relative h-[500px] w-[800px]">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 60,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                content={(props) => (
                  <div className="rounded-xl border border-neutral-800/60 bg-white/50 p-3">
                    {props.payload?.map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-4">
                        <span className="text-sm">
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Legend />

              <Line
                dataKey="realTasksLeft"
                name="Реальное"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                dataKey="expectedTasksLeft"
                name="Ожидаемое"
                stroke="#82ca9d"
                strokeDasharray="5 5"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <span className="absolute bottom-2 right-2 font-medium text-neutral-200">
            Дата спринта
          </span>
          <span className="absolute -top-8 left-4 font-medium text-neutral-200">
            Story Points
          </span>
        </CardContent>
      </Card>
    </div>
  );
};
