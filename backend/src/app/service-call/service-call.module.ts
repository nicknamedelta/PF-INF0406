import { Module } from "@nestjs/common";
import { ServiceCallService } from "./service-call.service";
import { ServiceCallController } from "./service-call.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { OrganizationModule } from "../organization/organization.module";
import { DepartmentModule } from "../department/department.module";

@Module({
    controllers: [ServiceCallController],
    providers: [ServiceCallService, PrismaService],
    imports: [OrganizationModule, DepartmentModule],
})
export class ServiceCallModule {}

