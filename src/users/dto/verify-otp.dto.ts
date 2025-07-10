import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class VerifyUserDto{
    @ApiProperty()
    @IsPhoneNumber("UZ")
    phone: string;
    @ApiProperty()
    @IsString()
    otp: string;
    @ApiProperty()
    @IsString()
    verification_key: string;
}