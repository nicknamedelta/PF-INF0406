import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginDto {
    @ApiProperty({ default: "jonasbrothers@getnada.com", description: "Its email of a registered user." })
    @IsEmail()
    email: string;

    @ApiProperty({ default: "12456", description: "Its password of a registered user." })
    @IsNotEmpty()
    password: string;
}

