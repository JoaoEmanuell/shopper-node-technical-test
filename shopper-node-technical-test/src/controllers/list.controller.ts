import { IncomingMessage, ServerResponse } from "http";
import { MeasureType } from "../dto/type.dto";
import { listService } from "../service/list.service";
import { errorReportReturnType } from "../utils/errorReport";
import { internalServerError } from "../utils/http/internalServerError";
import { badRequestError } from "../utils/http/badRequestError";
import { notFoundError } from "../utils/http/notFoundError";
import { okResponse } from "../utils/http/okResponse";

/**
 * controller for /list `{customer_code}/list?measure_type=water | gas`
 * @param req
 * @param res
 * @param customerCode customer code provide in url
 * @param measureType measure type provide in url query
 * @returns
 */
export const listController = async (
  req: IncomingMessage,
  res: ServerResponse,
  customerCode: string,
  measureType: MeasureType
) => {
  let serviceResponse;
  try {
    serviceResponse = await listService(req, customerCode, measureType); // call the service
    okResponse(res, serviceResponse);
    return;
  } catch (err: any) {
    const error = err as errorReportReturnType;
    // errors
    if (error["error_code"] === "MEASURE_NOT_FOUND") {
      notFoundError(res, error);
      return;
    } else if (error["error_code"] === "INVALID_TYPE") {
      badRequestError(res, error);
      return;
    } else {
      internalServerError(res);
      return;
    }
  }
  internalServerError(res);
};
