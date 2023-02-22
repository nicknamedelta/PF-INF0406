import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { OrganizationService } from "./organization.service";

@Module({
    controllers: [OrganizationController],
    providers: [OrganizationService, PrismaService],
    exports: [OrganizationService],
})
export class OrganizationModule {}
