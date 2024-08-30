import "reflect-metadata"; // used by class-validator
import { IsString, IsNotEmpty } from "class-validator";
import { MeasureType } from "./type.dto";

/**
 * Dto to list route
 */
export class ListCustomerDto {
  @IsString()
  @IsNotEmpty({ message: "The measure_type must not be empty" })
  measure_type!: MeasureType;
}
