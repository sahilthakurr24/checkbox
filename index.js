import http from "node:http";
import path from "path";
import epxress from "express";
import { Server } from "socket.io";
import { publisher, subscriber } from "./reddis.connection.js";
import { getData, setData } from "./public/services/get-set.js";

const CHECKBOX_SIZE = 160;
async function main() {
  const app = epxress();
  const server = http.createServer(app);
  const io = new Server();
  io.attach(server);

  await subscriber.subscribe("internal-server:checkbox:change");
  //getting the data from redis
  subscriber.on("message", (channel, message) => {
    if (channel === "internal-server:checkbox:change") {
      const { index, checked } = JSON.parse(message);

      // updating the state in server
      io.emit("server:checked:change", { index, checked });
    }
  });

  //websockets
  const rateLimitHashMap = new Map();

  io.on("connection", (socket) => {
    console.log("Socketd connected", socket.id);
    const lastOperationTime = rateLimitHashMap.get(socket.id);

    if (lastOperationTime) {
      const timeElapsed = Date.now() - lastOperationTime;

      if (timeElapsed < 5.5 * 1000) {
        socket.emit("server:error", { error: "Please Wait!!!" });
        return;
      }
    }

    // update time AFTER passing check
    rateLimitHashMap.set(socket.id, Date.now());

    socket.on("client:checked:change", async (data) => {
      console.log(`[${socket.id}]`, data);
      //set data in redis
      await setData(data);
      await publisher.publish(
        "internal-server:checkbox:change",
        JSON.stringify(data),
      );
    });
  });

  //express handlers
  app.use(epxress.static(path.resolve("./public")));
  app.use(epxress.urlencoded({ extended: true }));

  app.get("/health", (req, res) => {
    res.json({ healthy: true });
  });
  app.get("/checkbox", async (req, res) => {
    const existingState = await getData();
    if (existingState !== null) {
      return res.json({ checkBoxes: existingState });
    }
    return res.json({ checkBoxes: new Array(CHECKBOX_SIZE).fill(false) });
  });

  const PORT = process.env.PORT ?? 4000;
  server.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
  });
}

main();
