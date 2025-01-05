import express from "express";
import { createServer } from "node:http";
// import { join } from "node:path";
import { Server } from "socket.io";

const PORT = 4269;

export class SocketServer {
  app
  server
  io

  constructor () {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server);
  }

  connect () {
    this.io.on('connection', (socket) => {
      console.log('a user connected', socket);
    });

    this.io.on('connection_error', (err) => {
      console.error(err);
    });
  }

  listen () {
    // this.app.get('/', (req, res) => {
    //   res.status(200).send({ ok: 'ok' });
    // });
    this.server.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
  }
}