import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { OrganizationModule } from "../organization/organization.module";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService],
    imports: [OrganizationModule],
})
export class UserModule {}

