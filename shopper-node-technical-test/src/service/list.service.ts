import { IncomingMessage } from "http";
import { MeasureType } from "../dto/type.dto";
import { constructImageUrl } from "../utils/constructImageUrl";
import { validateMeasureType } from "../utils/validators/validationMeasureType";
import { prisma } from "../config/prisma";
import { errorReport } from "../utils/errorReport";

/**
 * list service
 * @param req server request, used to construct the url for image
 * @param customerCode customer code provide in url
 * @param measureType measure type provide in url query
 * @throws `MEASURE_NOT_FOUND`
 * @returns object with customer code and list of measures
 */
export const listService = async (
  req: IncomingMessage,
  customerCode: string,
  measureType: MeasureType
) => {
  const measureTypeBody = validateMeasureType(measureType, "INVALID_TYPE");

  const measures = await prisma.measure.findMany({
    where: {
      customer_code: customerCode,
      measure_type: measureTypeBody,
    },
  });
  if (measures.length === 0) {
    // if not has measures
    throw errorReport("MEASURE_NOT_FOUND", "Nenhuma leitura encontrada");
  }
  const formattedMeasures: {
    measure_uuid: string;
    measure_datetime: Date;
    measure_type: string;
    has_confirmed: boolean;
    image_url: string;
  }[] = [];

  await Promise.all(
    measures.map(async (measure) => {
      measure["image_url"] = constructImageUrl(req, measure["image_url"]);
      delete measure["month_and_year"];
      delete measure["customer_code"];
      delete measure["measure_value"]; // remove the keys
      formattedMeasures.push(measure);
    })
  );
  return {
    customer_code: customerCode,
    measures: formattedMeasures,
  };
};
