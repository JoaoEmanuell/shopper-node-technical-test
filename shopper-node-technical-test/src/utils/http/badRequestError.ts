import { ServerResponse } from "http";
import { sendJsonResponse } from "../sendJsonResponse";

/**
 * used to send a bad request (400) for user
 * @param res ServerResponse
 * @param data object for transform in a json
 * @returns void
 */
export const badRequestError = (res: ServerResponse, data: object) => {
  sendJsonResponse(res, 400, data);
  return;
};
