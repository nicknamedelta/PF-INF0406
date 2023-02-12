import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class DepartmentDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(45)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3, { message: "The Abbreviation is not filled in correctly. It must be between 3 to 8 characters long." })
    @MaxLength(8)
    abbreviation: string;

    @ApiProperty()
    @IsNotEmpty()
    priority: number;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    place: string;

    @ApiProperty()
    @IsNotEmpty()
    organizationId: string;
}

