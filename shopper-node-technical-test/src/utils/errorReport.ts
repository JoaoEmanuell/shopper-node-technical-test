export type errosCode =
  | "DOUBLE_REPORT"
  | "INVALID_DATA"
  | "MEASURE_NOT_FOUND"
  | "CONFIRMATION_DUPLICATE"
  | "INVALID_TYPE";

/**
 * construct a object with error for send to user
 * @param errorCode error code
 * @param description description for the error
 * @returns object with error
 */
export const errorReport = (
  errorCode: errosCode,
  description: string
): errorReportReturnType => {
  return { error_code: errorCode, error_description: description };
};

export type errorReportReturnType = {
  error_code: errosCode;
  error_description: string;
};
