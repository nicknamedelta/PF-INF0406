import { Module } from "@nestjs/common";
import { ServiceCallService } from "./service-call.service";
import { ServiceCallController } from "./service-call.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [ServiceCallController],
    providers: [ServiceCallService, PrismaService],
})
export class ServiceCallModule {}

