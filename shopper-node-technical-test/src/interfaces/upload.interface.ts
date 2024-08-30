import { MeasureType } from "../dto/type.dto";

/**
 * interface to upload body
 */
export interface uploadBodyInterface {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}
