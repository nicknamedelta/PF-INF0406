import { Organization } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { OrganizationDto } from "../../dto/organization.dto";
export declare class OrganizationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: OrganizationDto): Promise<Organization>;
    findAll(): Promise<Organization[] | {
        message: string;
    }>;
    findByCnpj(cnpj: any): Promise<Organization | {
        message: string;
    }>;
    update(cnpj: any, payload: any): Promise<Organization | {
        message: string;
    }>;
    delete(cnpj: any): Promise<{
        message: string;
    }>;
}
