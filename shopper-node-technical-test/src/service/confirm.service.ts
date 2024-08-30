import { UUID } from "crypto";
import { confirmBodyInterface } from "../interfaces/confirm.interface";
import { prisma } from "../config/prisma";
import { errorReport } from "../utils/errorReport";

/**
 * confirm service
 * @param body object that follows the confirmBodyInterface
 * @throws `MEASURE_NOT_FOUND` | `CONFIRMATION_DUPLICATE`
 * @returns `{ success: true }`
 */
export const confirmService = async (body: confirmBodyInterface) => {
  const queryObject = {
    measure_uuid: body.measure_uuid as UUID,
  }; // used to where in database.
  const savedMeasure = await prisma.measure.findUnique({
    where: queryObject,
  }); // get the saved measure using the uuid provide by user
  if (!savedMeasure) {
    // if not has a measure in database
    throw errorReport("MEASURE_NOT_FOUND", "Leitura do mês já realizada");
  } else if (
    savedMeasure.has_confirmed &&
    savedMeasure.measure_value === body.confirmed_value // saved value is equals to new value
  ) {
    // if measure has confirmed
    throw errorReport("CONFIRMATION_DUPLICATE", "Leitura do mês já realizada");
  }
  // change the saved measure
  savedMeasure.has_confirmed = true;
  savedMeasure.measure_value = body.confirmed_value;
  await prisma.measure.update({
    where: queryObject,
    data: savedMeasure,
  }); // update
  return {
    success: true,
  };
};
