import { BASE_URL } from "@/lib/constants";
import type { UserData } from "@/lib/types";
import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";

export const pockerPlanningConnection = new HubConnectionBuilder()
  .withUrl(`${BASE_URL}/poker-planning-hub`, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .build();

export const startPockerPlanningConnection = async ({
  sprintId,
  member,
}: {
  sprintId: string;
  member: UserData;
}) => {
  const { avatar, name, userId } = member;
  try {
    await pockerPlanningConnection.start();
    console.log("SignalR Connected to Pocker Planning.");
    await pockerPlanningConnection.invoke(
      "JoinPokerPlanningChannel",
      sprintId,
      userId,
      name,
      avatar,
    );
  } catch (err) {
    console.log(err);
    // setTimeout(startPockerPlanningConnection, 5000);
  }
};
