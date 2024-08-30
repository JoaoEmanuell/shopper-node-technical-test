import { ServerResponse } from "http";

/**
 * used to send a internal server error (500) for user
 * @param res ServerResponse
 * @returns void
 */
export const internalServerError = (res: ServerResponse) => {
  if (res.headersSent) {
    console.error("Response headers have already been sent.");
    return;
  } else {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 Internal Server Error");
    return;
  }
};
