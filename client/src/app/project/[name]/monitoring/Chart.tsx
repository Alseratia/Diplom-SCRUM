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
} from "recharts";

const data = [
  { sprintNumber: 1, sprintName: "Спринт 1", storyPoints: 15 },
  { sprintNumber: 2, sprintName: "Спринт 2", storyPoints: 17 },
  { sprintNumber: 3, sprintName: "Спринт 3", storyPoints: 18 },
  { sprintNumber: 4, sprintName: "Спринт 4", storyPoints: 20 },
  { sprintNumber: 5, sprintName: "Спринт 5", storyPoints: 18 },
  { sprintNumber: 6, sprintName: "Спринт 6", storyPoints: 18 },
  { sprintNumber: 7, sprintName: "Спринт 7", storyPoints: 15 },
  { sprintNumber: 8, sprintName: "Спринт 8", storyPoints: 22 },
  { sprintNumber: 9, sprintName: "Спринт 9", storyPoints: 25 },
  { sprintNumber: 10, sprintName: "Спринт 10", storyPoints: 20 },
];

export const Chart = ({}) => {
  return (
    <div className="flex items-center justify-center gap-10">
      <Card className="border-neutral-800/60 bg-neutral-800 text-white">
        <CardHeader className=" text-center font-semibold ">
          Количество Story Points за спринт
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
              <XAxis dataKey="sprintNumber" />
              <YAxis />

              <Tooltip
                content={(props) => (
                  <div className="rounded-xl border border-neutral-800/60 bg-white/50 p-3">
                    {props.payload?.map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-4">
                        <span className="text-semibold underline underline-offset-2">
                          {item.payload.sprintName}
                        </span>
                        <span className="text-sm">
                          Story Points: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Line
                dataKey="storyPoints"
                name="Story Points"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <span className="absolute bottom-12 right-2 font-medium text-neutral-200">
            Спринт
          </span>
          <span className="absolute -top-8 left-4 font-medium text-neutral-200">
            Story Points
          </span>
        </CardContent>
      </Card>
    </div>
  );
};
