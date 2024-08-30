import { IncomingMessage, ServerResponse } from "http";
import { ConfirmDto } from "../dto/confirm.dto";
import { validateBody } from "../utils/validators/validationBody";
import { confirmService } from "../service/confirm.service";
import { errorReportReturnType } from "../utils/errorReport";
import { internalServerError } from "../utils/http/internalServerError";
import { notFoundError } from "../utils/http/notFoundError";
import { conflictError } from "../utils/http/conflictError";
import { okResponse } from "../utils/http/okResponse";

/**
 * Controller for /confirm
 * @param req
 * @param res
 */
export const confirmController = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // get the body of the request
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // end request body

  req.on("end", async () => {
    // parse the body
    const parsedBody = await validateBody(body, ConfirmDto, res);
    if (parsedBody) {
      let serviceResponse;
      try {
        serviceResponse = await confirmService(parsedBody); // call the service
        okResponse(res, serviceResponse);
      } catch (err: any) {
        // error
        const error = err as errorReportReturnType;
        if (error["error_code"] === "MEASURE_NOT_FOUND")
          notFoundError(res, error);
        else if (error["error_code"] === "CONFIRMATION_DUPLICATE")
          conflictError(res, error);
        else {
          internalServerError(res);
          return;
        }
      }
      return;
    }
    internalServerError(res); // 500
  });
};
