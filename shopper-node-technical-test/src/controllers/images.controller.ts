import { IncomingMessage, ServerResponse } from "http";
import path from "path";
import fs from "fs";
import { internalServerError } from "../utils/http/internalServerError";
import { absolutePath } from "../utils/absolutePath";

/**
 * controller for get images
 * @param req
 * @param res
 */
export const imagesController = (req: IncomingMessage, res: ServerResponse) => {
  const baseDir = path.join(absolutePath, "database", "images"); // dir to images
  const filePath = path.join(baseDir, req.url?.replace("/images/", "") || ""); // path to image

  // Verify if file exists
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
  // Read the file and send response
  fs.readFile(filePath, (err, data) => {
    if (err) {
      internalServerError(res);
      return;
    }
    let contentType = "image/webp"; // default
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
};
