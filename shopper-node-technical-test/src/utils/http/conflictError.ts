import { ServerResponse } from "http";
import { sendJsonResponse } from "../sendJsonResponse";

/**
 * used to send a conflict (409) for user
 * @param res ServerResponse
 * @param data object for transform in a json
 * @returns void
 */
export const conflictError = (res: ServerResponse, data: object) => {
  sendJsonResponse(res, 409, data);
  return;
};
