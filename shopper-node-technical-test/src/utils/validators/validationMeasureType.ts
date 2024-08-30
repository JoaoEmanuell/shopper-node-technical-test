import { errorReport, errosCode } from "../errorReport";

/**
 * validate the measure type
 * @param measureType measure string for validate
 * @param errorCode error code for custom error, default is INVALID_DATA
 * @returns measure with spaces removed and lower case
 */
export const validateMeasureType = (
  measureType: string,
  errorCode: errosCode = "INVALID_DATA"
) => {
  const measureTreated = measureType.trim().toLowerCase();
  if (measureTreated !== "water" && measureTreated !== "gas") {
    throw errorReport(errorCode, "Tipo de medição não permitida");
  }
  return measureTreated;
};
