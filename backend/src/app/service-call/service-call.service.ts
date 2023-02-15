import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ServiceCall } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CONTEXT } from "src/constants";
import { CreateError, DeleteError, GetError, UpdateError } from "src/errors/";
import { ObjectIsEmpty } from "src/utils";
import { ServiceCallDto } from "src/dto/service-call.dto";
import { OrganizationService } from "../organization/organization.service";
import { DepartmentService } from "../department/department.service";

@Injectable()
export class ServiceCallService {
    constructor(private prisma: PrismaService, private organizationService: OrganizationService, private departmentService: DepartmentService) {}

    async create(dto: ServiceCallDto) {
        try {
            const organization = await this.organizationService.findById(dto.organizationId);
            if (!organization) {
                return { status: 400, error: "Theres no register of an organization with this id." };
            }

            const depId = organization.departments.find((item) => item.id === dto.departmentId);
            if (!depId) {
                return { status: 400, error: "Theres no register of an department with this id on this organization." };
            }

            const departments = await this.departmentService.findById(depId.id);
            const usId = departments.members.find((item) => item.id === dto.userId);
            if (!usId) {
                return { status: 400, error: "Theres no register of an user with this id on this department of the organization." };
            }

            return await this.prisma.serviceCall.create({
                data: {
                    longDescription: dto.longDescription,
                    shortDescription: dto.shortDescription,
                    initiatedAt: dto.initiatedAt,
                    finishedAt: dto.finishedAt,
                    priority: dto.priority,
                    currentState: dto.currentState,
                    userId: dto.userId,
                    organizationId: dto.organizationId,
                    departmentId: dto.departmentId,
                },
            });
        } catch (error) {
            throw new HttpException(CreateError(error, CONTEXT.SERVICE_CALL), HttpStatus.BAD_REQUEST);
        }
    }

    async findAll() {
        try {
            let services: ServiceCall[];

            services = await this.prisma.serviceCall.findMany();
            if (services.length == 0) {
                return { status: 400, error: "None services have been found." };
            }

            return services;
        } catch (error) {
            throw new HttpException(GetError(error, CONTEXT.SERVICE_CALL), HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id) {
        try {
            const services = await this.prisma.serviceCall.findUnique({
                where: { id },
            });

            if (!services) {
                return { status: 400, error: "There are no services with this id." };
            }

            return services;
        } catch (error) {
            throw new HttpException(GetError(error, CONTEXT.SERVICE_CALL), HttpStatus.BAD_REQUEST);
        }
    }

    async update(id, payload) {
        try {
            if (id && !ObjectIsEmpty(payload)) {
                return await this.prisma.serviceCall.update({
                    where: { id: id },
                    data: { ...payload, updatedAt: new Date() },
                });
            }

            return { status: 400, error: "Cannot update because there are no services with this id or theres nothing to update." };
        } catch (error) {
            throw new HttpException(UpdateError(error, CONTEXT.SERVICE_CALL), HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id) {
        try {
            if (!id) {
                return { status: 400, error: "Cannot delete because there are no services with this id." };
            }
            await this.prisma.serviceCall.delete({
                where: { id: id },
            });
        } catch (error) {
            throw new HttpException(DeleteError(error, CONTEXT.SERVICE_CALL), HttpStatus.BAD_REQUEST);
        }
    }
}

