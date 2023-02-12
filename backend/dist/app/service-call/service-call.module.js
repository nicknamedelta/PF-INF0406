"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCallModule = void 0;
const common_1 = require("@nestjs/common");
const service_call_service_1 = require("./service-call.service");
const service_call_controller_1 = require("./service-call.controller");
const prisma_service_1 = require("../../prisma/prisma.service");
let ServiceCallModule = class ServiceCallModule {
};
ServiceCallModule = __decorate([
    (0, common_1.Module)({
        controllers: [service_call_controller_1.ServiceCallController],
        providers: [service_call_service_1.ServiceCallService, prisma_service_1.PrismaService],
    })
], ServiceCallModule);
exports.ServiceCallModule = ServiceCallModule;
//# sourceMappingURL=service-call.module.js.map