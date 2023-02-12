import { BadRequestException, Injectable } from "@nestjs/common";
import { Department } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { ErrorType } from "src/types/ErrorType";
import { DepartmentDto } from "../../dto/department.dto";

@Injectable()
export class DepartmentService {
    constructor(private prisma: PrismaService) {}

    async create(dto: DepartmentDto) {
        const existing = await this.prisma.department.findUnique({
            where: { abbreviation: dto.abbreviation },
        });

        if (existing) {
            throw new BadRequestException(ErrorType.DepartmentExists);
        }

        const department = await this.prisma.department.create({
            data: {
                name: dto.name,
                abbreviation: dto.abbreviation,
                priority: dto.priority,
                place: dto.place,
                organizationId: dto.organizationId,
            },
        });

        return department;
    }

    async findAll() {
        let departments: Department[];

        departments = await this.prisma.department.findMany();
        if (departments.length == 0) {
            return "None departments have been found.";
        }

        return departments;
    }

    async findByAbbreviation(abbreviation) {
        const department = await this.prisma.department.findUnique({
            where: { abbreviation },
        });

        if (!department) {
            return "There are no departments with this abbreviation.";
        }

        return department;
    }

    async update(abbreviation, payload) {
        if (!abbreviation) {
            return "Cannot update because there are no departments with this abbreviation.";
        }

        return await this.prisma.department.update({ where: { abbreviation }, data: { ...payload, updatedAt: Date.now() } });
    }

    async delete(abbreviation?) {
        if (!abbreviation) {
            return "Cannot delete because there are no departments with this abbreviation.";
        }
        await this.prisma.department.delete({
            where: { abbreviation },
        });
    }
}

