// utils/socket.ts
import { io } from "socket.io-client";

const socket = io("https://backend.gamergizmo.com", {
  autoConnect: false, // prevent connecting before login
});

export default socket;
