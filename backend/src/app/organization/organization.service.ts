import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Organization } from "@prisma/client";
import { equals } from "class-validator";
import { CONTEXT } from "src/constants";
import { CreateError, DeleteError, GetError, UpdateError } from "src/errors/";
import { PrismaService } from "src/prisma/prisma.service";
import { ObjectIsEmpty } from "src/utils";
import { OrganizationDto } from "../../dto/organization.dto";

@Injectable()
export class OrganizationService {
    constructor(private prisma: PrismaService) {}

    async create(dto: OrganizationDto) {
        try {
            return await this.prisma.organization.create({
                data: {
                    email: dto.email,
                    name: dto.name,
                    cnpj: dto.cnpj,
                    cellphone: dto.cellphone,
                },
            });
        } catch (error) {
            throw new HttpException(CreateError(error, CONTEXT.DEPARTMENT), HttpStatus.BAD_REQUEST);
        }
    }

    async findAll() {
        try {
            let organizations: Organization[];

            organizations = await this.prisma.organization.findMany();
            if (organizations.length == 0) {
                return { status: 400, error: "None organizations have been found." };
            }

            return organizations;
        } catch (error) {
            throw new HttpException(GetError(error, CONTEXT.ORGANIZATION), HttpStatus.BAD_REQUEST);
        }
    }

    async findByCnpj(cnpj) {
        try {
            const organization = await this.prisma.organization.findUnique({
                where: { cnpj },
            });

            if (!organization) {
                return { status: 400, error: "There are no organizations with this cnpj." };
            }

            return organization;
        } catch (error) {
            throw new HttpException(GetError(error, CONTEXT.ORGANIZATION), HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id) {
        return await this.prisma.organization.findUnique({
            where: { id },
            include: {
                employees: true,
                departments: true,
            },
        });
    }

    async update(cnpj, payload) {
        try {
            if (cnpj && !ObjectIsEmpty(payload)) {
                return await this.prisma.organization.update({
                    where: { cnpj },
                    data: { ...payload, updatedAt: new Date() },
                });
            }

            return { status: 400, error: "Cannot update because there are no organizations with this cnpj or theres nothing to update." };
        } catch (error) {
            throw new HttpException(UpdateError(error, CONTEXT.ORGANIZATION), HttpStatus.BAD_REQUEST);
        }
    }

    async delete(cnpj) {
        try {
            if (!cnpj) {
                return { status: 400, error: "Cannot delete because there are no organizations with this cnpj." };
            }
            await this.prisma.organization.delete({
                where: { cnpj },
            });
        } catch (error) {
            throw new HttpException(DeleteError(error, CONTEXT.ORGANIZATION), HttpStatus.BAD_REQUEST);
        }
    }
}

