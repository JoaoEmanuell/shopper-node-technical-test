import { ServerResponse } from "http";
import { sendJsonResponse } from "../sendJsonResponse";

/**
 * used to send a ok (200) for user
 * @param res ServerResponse
 * @param data object for transform in a json
 * @returns void
 */
export const okResponse = (res: ServerResponse, data: object) => {
  sendJsonResponse(res, 200, data);
  return;
};
