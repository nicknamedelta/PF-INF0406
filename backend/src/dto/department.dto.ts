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
    @MinLength(3)
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

