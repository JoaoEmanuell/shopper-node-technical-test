import { ServerResponse } from "http";

/**
 * transform a object in a valid json to send to user
 * @param res Server response
 * @param statusCode status code for send
 * @param data object to transform in a json
 * @returns void
 */
export const sendJsonResponse = (
  res: ServerResponse,
  statusCode: number,
  data: Object
) => {
  if (res.headersSent) {
    console.error("Response headers have already been sent.");
    return;
  }
  try {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("500 Internal Server Error");
  }
};
