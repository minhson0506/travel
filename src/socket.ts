import {Socket, io} from "socket.io-client";
import {ClientToServerEvents, ServerToClientEvents} from "./interfaces/ISocket";

const URL = process.env.REACT_APP_SOCKET_URL as string
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL)
