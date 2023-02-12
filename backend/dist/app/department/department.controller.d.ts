import { DepartmentService } from "./department.service";
import { DepartmentDto } from "../../dto/department.dto";
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    findAll(): Promise<import(".prisma/client").Department[] | {
        message: string;
    }>;
    findByAbbreviation(abbreviation: string): Promise<import(".prisma/client").Department | {
        message: string;
    }>;
    create(departmentDto: DepartmentDto): Promise<import(".prisma/client").Department>;
    updateByAbbreviation(payload: any, abbreviation: string): Promise<import(".prisma/client").Department | {
        message: string;
    }>;
    deleteByAbbreviation(abbreviation: string): Promise<{
        message: string;
    }>;
}
