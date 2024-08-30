import { IncomingMessage, ServerResponse } from "http";
import { UploadDto } from "../dto/upload.dto";
import { validateBody } from "../utils/validators/validationBody";
import { uploadService } from "../service/upload.service";
import { errorReportReturnType } from "../utils/errorReport";
import { internalServerError } from "../utils/http/internalServerError";
import { badRequestError } from "../utils/http/badRequestError";
import { conflictError } from "../utils/http/conflictError";
import { okResponse } from "../utils/http/okResponse";

export const uploadController = (req: IncomingMessage, res: ServerResponse) => {
  // get the body of the request
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // end request body

  req.on("end", async () => {
    // parse the body
    const parsedBody = await validateBody(body, UploadDto, res);
    if (parsedBody) {
      let serviceResponse;
      try {
        serviceResponse = await uploadService(parsedBody, req); // call the service
        okResponse(res, serviceResponse);
      } catch (err: any) {
        // error
        const error = err as errorReportReturnType;
        if (error["error_code"] === "INVALID_DATA") badRequestError(res, error);
        else if (error["error_code"] === "DOUBLE_REPORT")
          conflictError(res, error);
        else internalServerError(res);
      }
      return;
    }
    internalServerError(res);
  });
};
