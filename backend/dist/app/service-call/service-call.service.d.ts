import { ServiceCall } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { ServiceCallDto } from "src/dto/service-call.dto";
export declare class ServiceCallService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: ServiceCallDto): Promise<ServiceCall>;
    findAll(): Promise<ServiceCall[] | {
        message: string;
    }>;
    findById(id: any): Promise<ServiceCall | {
        message: string;
    }>;
    update(id: any, payload: any): Promise<ServiceCall | {
        message: string;
    }>;
    delete(id: any): Promise<{
        message: string;
    }>;
}
