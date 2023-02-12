import { BadRequestException, Injectable } from "@nestjs/common";
import { Organization } from "@prisma/client";
import { equals } from "class-validator";
import { PrismaService } from "src/prisma/prisma.service";
import { ErrorType } from "src/types/ErrorType";
import { OrganizationDto } from "../../dto/organization.dto";

@Injectable()
export class OrganizationService {
    constructor(private prisma: PrismaService) {}

    async create(dto: OrganizationDto) {
        const existing = await this.prisma.organization.findUnique({
            where: { cnpj: dto.name },
        });

        if (existing) {
            throw new BadRequestException(ErrorType.OrganizationExists);
        }

        const organization = await this.prisma.organization.create({
            data: {
                email: dto.email,
                name: dto.name,
                cnpj: dto.cnpj,
                cellphone: dto.cellphone,
            },
        });

        return organization;
    }

    async findAll() {
        let organizations: Organization[];

        organizations = await this.prisma.organization.findMany();
        if (organizations.length == 0) {
            return "None organizations have been found.";
        }

        return organizations;
    }

    async findByCnpj(cnpj) {
        const organization = await this.prisma.organization.findUnique({
            where: { cnpj },
        });

        if (!organization) {
            return "There are no organizations with this cnpj.";
        }

        return organization;
    }

    async update(cnpj, payload) {
        if (!cnpj) {
            return "Cannot update because there are no organizations with this cnpj.";
        }

        return await this.prisma.organization.update({ where: { cnpj }, data: payload });
    }

    async delete(cnpj?) {
        if (!cnpj) {
            return "Cannot delete because there are no organizations with this cnpj.";
        }
        await this.prisma.organization.delete({
            where: { cnpj },
        });
    }
}

