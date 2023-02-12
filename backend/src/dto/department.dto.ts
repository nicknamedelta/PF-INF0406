import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class DepartmentDto {
    @ApiProperty({ default: "Tecnologia da Informação e Comunicação", description: "Its name of department." })
    @IsNotEmpty()
    @MinLength(6, { message: "The CNPJ is not filled in correctly. It must be between 6 to 45 characters long." })
    @MaxLength(45)
    name: string;

    @ApiProperty({ default: "DTIC", description: "Its the acronym of the departments name." })
    @IsNotEmpty()
    @MinLength(3, { message: "The Abbreviation is not filled in correctly. It must be between 3 to 8 characters long." })
    @MaxLength(8)
    abbreviation: string;

    @ApiProperty({ enum: [1, 2, 3, 4], description: "Its the priority of the task: {1: LOW, 2: MEDIUM, 3: HIGH, 4: CATASTROPHIC}." })
    @IsNotEmpty()
    priority: number;

    @ApiProperty({
        default: "Av. Alameda da Flores, Edifício Son Silvestre, Andar 2. 07042-090, Goiânia, GO.",
        description: "Wheres the department is located inside the organization.",
    })
    @IsNotEmpty()
    @MaxLength(255, { message: "The CNPJ is not filled in correctly. It must be max 255 characters long." })
    place: string;

    @ApiProperty({
        description: "Is the uuid of the organization.",
    })
    @IsNotEmpty()
    organizationId: string;
}

