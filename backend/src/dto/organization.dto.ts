import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class OrganizationDto {
    @ApiProperty({ default: "jonasbrothers@getnada.com", description: "Its the email of organization." })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ default: "99521209000179", description: "Its the 14 digits organization CNPJ." })
    @IsNotEmpty()
    @MinLength(14, { message: "The CNPJ is not filled in correctly. It must be 14 characters long." })
    @MaxLength(14)
    cnpj: string;

    @ApiProperty({ default: "IBM Not Factorys", description: "Its the organization fantasy name." })
    @IsNotEmpty()
    @MaxLength(45, { message: "The organization name is not filled in correctly. It must be max 45 characters long." })
    name: string;

    @ApiProperty({ default: "18004262255", description: "Its the organization cellphone." })
    @IsNotEmpty()
    @MaxLength(11, { message: "The cellphone is not filled in correctly. It must be max 11 characters long." })
    cellphone: string;
}

