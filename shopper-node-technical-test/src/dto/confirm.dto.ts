import "reflect-metadata"; // used by class-validator
import { IsString, IsUUID, IsNotEmpty, IsNumber, Min } from "class-validator";

/**
 * Dto to confirm route
 */
export class ConfirmDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty({ message: "The measure_uuid must not be empty" })
  measure_uuid!: string;
  @IsNumber()
  @IsNotEmpty({ message: "The confirmed_value must not be empty" })
  @Min(0, {
    message: "The confirmed_value must not be less than 0",
  })
  confirmed_value!: number;
}
