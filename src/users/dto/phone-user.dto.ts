import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class PhoneUserDto{
    @ApiProperty()
    @IsPhoneNumber("UZ")
    phone: string;
}