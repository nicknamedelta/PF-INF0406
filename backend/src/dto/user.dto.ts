import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(64)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(200)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(45)
    role: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(24)
    userType: string;

    @ApiProperty()
    @IsNotEmpty()
    organizationId: string;

    @ApiProperty()
    @IsNotEmpty()
    departmentId: string;
}

