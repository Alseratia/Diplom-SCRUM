import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL } from "./constants";

export const notificationsConnection = new HubConnectionBuilder()
  .withUrl(`${BASE_URL}/notifications-hub`, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .build();

export const startNotificationsConnection = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    await notificationsConnection.start();
    console.log("SignalR Connected.");
    await notificationsConnection.invoke("JoinNotificationsChannel", userId);
  } catch (err) {
    console.log(err);
    setTimeout(startNotificationsConnection, 5000);
  }
};
