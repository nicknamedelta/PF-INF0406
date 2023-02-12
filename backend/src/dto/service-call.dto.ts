import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class ServiceCallDto {
    @ApiProperty()
    @IsOptional()
    @IsDate()
    initiatedAt: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    finishedAt: string;

    @ApiProperty()
    @IsOptional()
    @MinLength(14, { message: "The long description is not filled in correctly. It must be between 14 to 255 characters long." })
    @MaxLength(255)
    longDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4, { message: "The long description is not filled in correctly. It must be between 4 to 24 characters long." })
    @MaxLength(60)
    shortDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    currentState: number;

    @ApiProperty()
    @IsNotEmpty()
    priority: number;

    @ApiProperty()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    organizationId: string;

    @ApiProperty()
    @IsNotEmpty()
    departmentId: string;
}

