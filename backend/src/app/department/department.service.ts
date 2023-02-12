import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Department } from "@prisma/client";
import { CONTEXT } from "src/constants";
import { CreateError, DeleteError, GetError, UpdateError } from "src/errors/";
import { PrismaService } from "src/prisma/prisma.service";
import { ObjectIsEmpty } from "src/utils";
import { DepartmentDto } from "../../dto/department.dto";

@Injectable()
export class DepartmentService {
    constructor(private prisma: PrismaService) {}

    async create(dto: DepartmentDto) {
        try {
            return await this.prisma.department.create({
                data: {
                    name: dto.name,
                    abbreviation: dto.abbreviation,
                    priority: dto.priority,
                    place: dto.place,
                    organizationId: dto.organizationId,
                },
            });
        } catch (error) {
            throw new HttpException(CreateError(error, CONTEXT.USER), HttpStatus.BAD_REQUEST);
        }
    }

    async findAll() {
        try {
            let departments: Department[];

            departments = await this.prisma.department.findMany();
            if (departments.length == 0) {
                return { message: "None departments have been found." };
            }

            return departments;
        } catch (error) {
            throw new HttpException(GetError(error, CONTEXT.DEPARTMENT), HttpStatus.BAD_REQUEST);
        }
    }

    async findByAbbreviation(abbreviation) {
        try {
            const department = await this.prisma.department.findUnique({
                where: { abbreviation },
            });

            if (!department) {
                return { message: "There are no departments with this abbreviation." };
            }

            return department;
        } catch (error) {
            throw new HttpException(GetError(error, CONTEXT.DEPARTMENT), HttpStatus.BAD_REQUEST);
        }
    }

    async update(abbreviation, payload) {
        try {
            if (abbreviation && !ObjectIsEmpty(payload)) {
                return await this.prisma.department.update({
                    where: { abbreviation },
                    data: { ...payload, updatedAt: new Date() },
                });
            }

            return { message: "Cannot update because there are no departments with this abbreviation." };
        } catch (error) {
            throw new HttpException(UpdateError(error, CONTEXT.DEPARTMENT), HttpStatus.BAD_REQUEST);
        }
    }

    async delete(abbreviation) {
        try {
            if (!abbreviation) {
                return { message: "Cannot update because there are no departments with this abbreviation or theres nothing to update." };
            }
            await this.prisma.department.delete({
                where: { abbreviation },
            });
        } catch (error) {
            throw new HttpException(DeleteError(error, CONTEXT.DEPARTMENT), HttpStatus.BAD_REQUEST);
        }
    }
}

