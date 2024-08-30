import { ServerResponse } from "http";
import { sendJsonResponse } from "../sendJsonResponse";

/**
 * used to send a not found (404) for user
 * @param res ServerResponse
 * @param data object for transform in a json
 * @returns void
 */
export const notFoundError = (res: ServerResponse, data: object) => {
  sendJsonResponse(res, 404, data);
  return;
};
