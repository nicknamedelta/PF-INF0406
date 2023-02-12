import { ServiceCallService } from "./service-call.service";
import { ServiceCallDto } from "../../dto/service-call.dto";
export declare class ServiceCallController {
    private readonly serviceCallService;
    constructor(serviceCallService: ServiceCallService);
    findAll(): Promise<import(".prisma/client").ServiceCall[] | {
        message: string;
    }>;
    findById(id: string): Promise<import(".prisma/client").ServiceCall | {
        message: string;
    }>;
    create(serviceCallDto: ServiceCallDto): Promise<import(".prisma/client").ServiceCall>;
    updateById(payload: any, id: string): Promise<import(".prisma/client").ServiceCall | {
        message: string;
    }>;
    deleteById(id: string): Promise<{
        message: string;
    }>;
}
