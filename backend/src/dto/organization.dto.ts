import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class OrganizationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(14, { message: "The CNPJ is not filled in correctly. It must be 14 characters long." })
    @MaxLength(14)
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

