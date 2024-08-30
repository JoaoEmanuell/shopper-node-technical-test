import { randomUUID } from "crypto";
import sharp from "sharp";
import { prisma } from "../config/prisma";
import { uploadBodyInterface } from "../interfaces/upload.interface";
import { getMonthAndYear } from "../utils/getMonthAndYear";
import { IncomingMessage } from "http";
import { Gemini } from "../gemini/gemini";
import { errorReport } from "../utils/errorReport";
import { validateMeasureType } from "../utils/validators/validationMeasureType";
import { constructImageUrl } from "../utils/constructImageUrl";

/**
 * upload service
 * @param body
 * @param req
 * @throws `DOUBLE_REPORT` | `INVALID_DATA`
 * @returns object with image url, measure value and measure uuid
 */
export const uploadService = async (
  body: uploadBodyInterface,
  req: IncomingMessage
) => {
  const measureType = validateMeasureType(body.measure_type);
  const dateTime = new Date(body.measure_datetime);
  const monthAndYear = getMonthAndYear(dateTime);
  const savedMeasure = await prisma.measure.findFirst({
    where: { month_and_year: monthAndYear },
  });
  if (savedMeasure) {
    throw errorReport("DOUBLE_REPORT", "Leitura do mês já realizada");
  }
  const measureUUID = randomUUID(); // generate the measure uuid
  const imageName = `${measureUUID}.webp`;
  const imagePath = `./database/images/${imageName}`; // path to image
  try {
    // save the image in server
    await sharp(Buffer.from(body["image"], "base64")).toFile(imagePath);
  } catch (err) {
    console.log(err);
    // if error to save image
    throw errorReport("INVALID_DATA", "invalid image");
  }
  const imageUrl = constructImageUrl(req, imageName); // url to access the image in server
  // get the measure value using Gemini
  const gemini = new Gemini();
  const geminiResult = await gemini.getMeasureValue(imagePath, measureType);

  await prisma.measure.create({
    data: {
      measure_uuid: measureUUID,
      customer_code: body.customer_code,
      image_url: imageName,
      measure_datetime: dateTime,
      measure_type: measureType,
      measure_value: geminiResult.measureValue,
      month_and_year: monthAndYear,
    },
  }); // save in db
  return {
    image_url: imageUrl,
    measure_value: geminiResult.measureValue,
    measure_uuid: measureUUID,
  };
};
