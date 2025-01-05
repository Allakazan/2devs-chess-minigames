import { SocketServer } from './socketServer.js'

const socketServer = new SocketServer();
socketServer.connect();
socketServer.listen();