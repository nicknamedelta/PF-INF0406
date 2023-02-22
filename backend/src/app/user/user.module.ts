import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { OrganizationModule } from "../organization/organization.module";
import { DepartmentModule } from "../department/department.module";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService],
    imports: [OrganizationModule, DepartmentModule],
})
export class UserModule {}
