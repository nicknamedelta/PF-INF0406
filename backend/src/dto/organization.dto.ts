import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class OrganizationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(14, { message: "CNPJ is not correctly filled up. They have 14 characters." })
    @MaxLength(14, { message: "CNPJ is not correctly filled up. They have 14 characters." })
    cnpj: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(45)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(11)
    cellphone: string;
}

