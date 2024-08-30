import { ServerResponse } from "http";
import { validateDto } from "./validationDto";
import { badRequestError } from "../http/badRequestError";

/**
 * validate the body
 * @param body string with request body
 * @param dto dto used to model the body request
 * @param res server response
 * @returns object with parsed body
 */
export const validateBody = async (
  body: string,
  dto: any,
  res: ServerResponse
) => {
  try {
    const parsedBody = JSON.parse(body);
    const dtoInstance = Object.assign(new dto(), parsedBody);
    const errors = await validateDto(dtoInstance);
    if (errors) {
      badRequestError(res, errors);
      return null;
    }
    return parsedBody;
  } catch (error) {
    badRequestError(res, { message: "Invalid JSON format" }); // invalid json error
  }
};
