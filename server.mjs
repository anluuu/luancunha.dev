import { serve } from "srvx";
import { serveStatic } from "srvx/static";
import handler from "./dist/server/server.js";
serve({
  middleware: [serveStatic({ dir: "./dist/client" })],
  fetch: handler.fetch,
  port: Number(process.env.PORT) || 3000,
});
