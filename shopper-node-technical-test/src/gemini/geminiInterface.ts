import { MeasureType } from "../dto/type.dto";

export interface GeminiInterface {
  /**
   * use the gemini api to get the measure value using a image.
   * @param imagePath path to saved image
   * @param measureType type of measure, gas or water
   * @returns `{ measureValue: number }`
   */
  getMeasureValue(
    imagePath: string,
    measureType: MeasureType
  ): Promise<{
    measureValue: number;
  }>;
}
