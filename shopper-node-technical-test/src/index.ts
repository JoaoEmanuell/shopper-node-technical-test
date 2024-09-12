import http from "http";

import { uploadController } from "./controllers/upload.controller";
import { confirmController } from "./controllers/confirm.controller";
import { listController } from "./controllers/list.controller";
import { imagesController } from "./controllers/images.controller";
import { MeasureType } from "./dto/type.dto";
import { notFoundError } from "./utils/http/notFoundError";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const PORT = 3000;

/**
 * middleware function to handle CORS headers
 * @param res
 */
const setCorsHeaders = (res: http.ServerResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};

/**
 * Run the server
 */
const server = http.createServer((req, res) => {
  // CORS for all responses
  setCorsHeaders(res);
  if (req.url === "/upload" && req.method === "POST") {
    uploadController(req, res);
    return;
  } else if (req.url === "/confirm" && req.method === "PATCH") {
    confirmController(req, res);
    return;
  } else if (req.url?.startsWith("/images/") && req.method === "GET") {
    imagesController(req, res);
    return;
  } else {
    // list route
    const listRoutePattern = /^\/([^/]+)\/list$/;
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const match = url.pathname.match(listRoutePattern);
    if (match && req.method === "GET") {
      const customerCode = match[1]; // get customer code
      // get measure type from url
      const measureType = url.searchParams
        .get("measure_type")
        ?.trim()
        .toLowerCase();
      listController(req, res, customerCode, measureType as MeasureType);
      return;
    } else {
      // not found
      notFoundError(res, { error: "Route not found" });
      return;
    }
  }
});

server.listen(PORT, () => {
  // setup
  if (!existsSync("database")) {
    mkdirSync("database");
  }
  if (!existsSync(join("database", "images"))) {
    mkdirSync(join("database", "images"));
  }
  console.log(`Server running at http://localhost:${PORT}/`);
});
