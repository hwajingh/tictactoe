import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_live_k4DsFan-YY5dpSx3lkw_eDJT",
});

export const { RoomProvider, useOthers } = createRoomContext(client);
