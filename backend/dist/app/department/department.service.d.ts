import { Department } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { DepartmentDto } from "../../dto/department.dto";
export declare class DepartmentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: DepartmentDto): Promise<Department>;
    findAll(): Promise<Department[] | {
        message: string;
    }>;
    findByAbbreviation(abbreviation: any): Promise<Department | {
        message: string;
    }>;
    update(abbreviation: any, payload: any): Promise<Department | {
        message: string;
    }>;
    delete(abbreviation: any): Promise<{
        message: string;
    }>;
}
