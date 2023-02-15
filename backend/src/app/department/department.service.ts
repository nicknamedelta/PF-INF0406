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
            throw new HttpException(CreateError(error, CONTEXT.DEPARTMENT), HttpStatus.BAD_REQUEST);
        }
    }

    async findAll() {
        try {
            let departments: Department[];

            departments = await this.prisma.department.findMany();
            if (departments.length == 0) {
                return { status: 400, error: "None departments have been found." };
            }

            return departments;
        } catch (error) {
            throw new HttpException(GetError(error, CONTEXT.DEPARTMENT), HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id) {
        return await this.prisma.department.findUnique({
            where: { id },
            include: {
                members: true,
            },
        });
    }

    async update(id, payload) {
        try {
            if (id && !ObjectIsEmpty(payload)) {
                return await this.prisma.department.update({
                    where: { id },
                    data: { ...payload, updatedAt: new Date() },
                });
            }

            return { error: "Cannot update because there are no departments with this id." };
        } catch (error) {
            throw new HttpException(UpdateError(error, CONTEXT.DEPARTMENT), HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id) {
        try {
            if (!id) {
                return { error: "Cannot delete because there are no departments with this id." };
            }
            await this.prisma.department.delete({
                where: { id },
            });
        } catch (error) {
            throw new HttpException(DeleteError(error, CONTEXT.DEPARTMENT), HttpStatus.BAD_REQUEST);
        }
    }
}

