import { OrganizationService } from "./organization.service";
import { OrganizationDto } from "../../dto/organization.dto";
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    findAll(): Promise<import(".prisma/client").Organization[] | {
        message: string;
    }>;
    findByCnpj(cnpj: string): Promise<import(".prisma/client").Organization | {
        message: string;
    }>;
    create(organizationDto: OrganizationDto): Promise<import(".prisma/client").Organization>;
    updateById(payload: any, cnpj: string): Promise<import(".prisma/client").Organization | {
        message: string;
    }>;
    deleteById(cnpj: string): Promise<{
        message: string;
    }>;
}
