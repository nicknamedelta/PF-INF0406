import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @ApiProperty({ default: "jonasbrothers@gmail.com", description: "Its the user email." })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ default: "123456", description: "Its the user password." })
    @IsNotEmpty()
    @MinLength(6, { message: "The user password name is not filled in correctly. It must be bewtween 6 to 45 characters long." })
    @MaxLength(64)
    password: string;

    @ApiProperty({ default: "Jonas Brother", description: "Its the user real name." })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200, { message: "The user name is not filled in correctly. It must be between 3 to 200 characters long." })
    name: string;

    @ApiProperty({ default: "Analista de Sistemas", description: "Its the role those user occupies in the organization." })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(45, { message: "The user role is not filled in correctly. It must be between 6 to 45 characters long." })
    role: string;

    @ApiProperty({ enum: ["admin", "technician", "common"], description: "Its the system permission user have." })
    @IsNotEmpty()
    userType: string;

    @ApiProperty({
        description: "Is the uuid of the organization.",
    })
    @IsNotEmpty()
    organizationId: string;

    @ApiProperty({
        description: "Is the uuid of the department.",
    })
    @IsNotEmpty()
    departmentId: string;
}
