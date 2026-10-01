import { afterEach, describe, expect, it } from "vitest";
import { io, type Socket } from "socket.io-client";
import { createApplication } from "../server/app";
import type {
  ClientEvents,
  RoomSnapshot,
  ServerEvents,
} from "../src/types/room";
import type { AddressInfo } from "node:net";
import { MATCH_INTRO_MS } from "../src/game/moves/actions";

describe("HTTP + Socket.IO integration", () => {
  let app: ReturnType<typeof createApplication> | undefined;
  const clients: Socket<ServerEvents, ClientEvents>[] = [];
  afterEach(async () => {
    clients.forEach((client) => client.disconnect());
    clients.length = 0;
    await app?.close();
  });
  it("tạo phòng qua HTTP, hai client đồng bộ nước đi/chat/hòa/rời phòng", async () => {
    app = createApplication();
    await new Promise<void>((resolve) =>
      app!.http.listen(0, "127.0.0.1", resolve),
    );
    const url = `http://127.0.0.1:${(app.http.address() as AddressInfo).port}`;
    expect((await fetch(`${url}/api/health`)).status).toBe(200);
    const response = await fetch(`${url}/api/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Integration" }),
    });
    expect(response.status).toBe(201);
    const { id } = await response.json();
    const connect = async () => {
      const client: Socket<ServerEvents, ClientEvents> = io(url, {
        transports: ["websocket"],
        reconnection: false,
      });
      clients.push(client);
      await new Promise<void>((resolve, reject) => {
        client.once("connect", resolve);
        client.once("connect_error", reject);
      });
      return client;
    };
    const red = await connect(),
      black = await connect();
    expect(
      (
        await red
          .timeout(2000)
          .emitWithAck("room:join", { roomId: id, name: "Alice" })
      ).ok,
    ).toBe(true);
    expect(
      (
        await black
          .timeout(2000)
          .emitWithAck("room:join", { roomId: id, name: "Bob" })
      ).ok,
    ).toBe(true);
    await red.timeout(2000).emitWithAck("game:command", { type: "ready" });
    await black.timeout(2000).emitWithAck("game:command", { type: "ready" });
    await new Promise((resolve) => setTimeout(resolve, MATCH_INTRO_MS + 20));
    const move = {
      type: "move" as const,
      move: { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } },
    };
    expect(
      (await black.timeout(2000).emitWithAck("game:command", move)).ok,
    ).toBe(false);
    const broadcast = new Promise<RoomSnapshot>((resolve) => {
      const listen = (room: RoomSnapshot) => {
        if (room.game.board[5][0]) {
          black.off("room:state", listen);
          resolve(room);
        }
      };
      black.on("room:state", listen);
    });
    expect((await red.timeout(2000).emitWithAck("game:command", move)).ok).toBe(
      true,
    );
    expect((await broadcast).game.currentTurn).toBe("black");
    const chat = await red.timeout(2000).emitWithAck("chat:send", "Chào bạn!");
    expect(chat.ok && chat.data.messages.at(-1)?.name).toBe("Alice");
    await red.timeout(2000).emitWithAck("game:command", { type: "offer-draw" });
    const draw = await black
      .timeout(2000)
      .emitWithAck("game:command", { type: "reply-draw", accepted: true });
    expect(draw.ok && draw.data.game.result?.reason).toBe("draw");
    await red.timeout(2000).emitWithAck("room:leave");
    await black.timeout(2000).emitWithAck("room:leave");
    expect(await (await fetch(`${url}/api/rooms`)).json()).toEqual([]);
  });
});
