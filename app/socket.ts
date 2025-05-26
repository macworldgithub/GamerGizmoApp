// socket.js
import { io } from 'socket.io-client';

const socket = io('https://backend.gamergizmo.com', {
  transports: ['websocket'],
  autoConnect: false,
});

export default socket;
