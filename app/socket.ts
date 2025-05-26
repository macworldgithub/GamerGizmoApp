import { io } from "socket.io-client";

const SOCKET_URL = "https://backend.gamergizmo.com"; // your local/server URL

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});
