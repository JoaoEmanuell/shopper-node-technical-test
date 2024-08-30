import "reflect-metadata"; // used by class-validator
import { IsBase64, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { MeasureType } from "./type.dto";

/**
 * dto to upload route
 */
export class UploadDto {
  @IsBase64()
  @IsNotEmpty({ message: "The image must not be empty" })
  image!: string;

  @IsString()
  @IsNotEmpty({ message: "The customer_code must not be empty" })
  customer_code!: string;

  @IsDateString()
  @IsNotEmpty({ message: "The measure_datetime must not be empty" })
  measure_datetime!: Date;

  @IsString()
  @IsNotEmpty({ message: "The measure_type must not be empty" })
  measure_type!: MeasureType;
}
