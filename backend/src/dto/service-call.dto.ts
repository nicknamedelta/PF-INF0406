import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class ServiceCallDto {
    @ApiPropertyOptional({ description: "Its the date info when the card was moved to 2: working." })
    @IsOptional()
    @IsDate()
    initiatedAt: string;

    @ApiPropertyOptional({ description: "Its the date info when the card was moved to 3: finished." })
    @IsOptional()
    @IsDate()
    finishedAt: string;

    @ApiPropertyOptional({
        default: "Resolver conexão Wifi Jonas 5G, pois, não está sendo possível acessar a internet através dele.",
        description: "Its a long and detailed description of the service call.",
    })
    @IsOptional()
    @MinLength(14, { message: "The long description is not filled in correctly. It must be between 14 to 255 characters long." })
    @MaxLength(255)
    longDescription: string;

    @ApiProperty({ default: "Resolver conexão Wifi Jonas 5G", description: "Its the description of the service call." })
    @IsNotEmpty()
    @MinLength(4, { message: "The long description is not filled in correctly. It must be between 4 to 24 characters long." })
    @MaxLength(60)
    shortDescription: string;

    @ApiProperty({ enum: [1, 2, 3], description: "Its the currently state of the service call: {1: to-do, 2: working, 3: finished}." })
    @IsNotEmpty()
    currentState: number;

    @ApiProperty({ enum: [1, 2, 3, 4], description: "Its the priority of the task: {1: LOW, 2: MEDIUM, 3: HIGH, 4: CATASTROPHIC}." })
    @IsNotEmpty()
    priority: number;

    @ApiProperty({
        description: "Is the uuid of the user who solicited this service call.",
    })
    @IsNotEmpty()
    userId: string;

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

