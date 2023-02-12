"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCallService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const utils_1 = require("../../utils");
let ServiceCallService = class ServiceCallService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            const service = await this.prisma.serviceCall.create({
                data: {
                    longDescription: dto.longDescription,
                    shortDescription: dto.shortDescription,
                    initiatedAt: dto.initiatedAt,
                    finishedAt: dto.finishedAt,
                    priority: dto.priority,
                    currentState: dto.currentState,
                    userId: dto.userId,
                    organizationId: dto.organizationId,
                    departmentId: dto.departmentId,
                },
            });
            return service;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.CreateError)(error, constants_1.CONTEXT.SERVICE_CALL), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            let services;
            services = await this.prisma.serviceCall.findMany();
            if (services.length == 0) {
                return { message: "None services have been found." };
            }
            return services;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.GetError)(error, constants_1.CONTEXT.SERVICE_CALL), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findById(id) {
        try {
            const services = await this.prisma.serviceCall.findUnique({
                where: { id },
            });
            if (!services) {
                return { message: "There are no servicess with this id." };
            }
            return services;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.GetError)(error, constants_1.CONTEXT.SERVICE_CALL), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, payload) {
        try {
            if (id && !(0, utils_1.ObjectIsEmpty)(payload)) {
                return await this.prisma.serviceCall.update({
                    where: { id: id },
                    data: Object.assign(Object.assign({}, payload), { updatedAt: new Date() }),
                });
            }
            return { message: "Cannot update because there are no services with this id or theres nothing to update." };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException((0, errors_1.UpdateError)(error, constants_1.CONTEXT.SERVICE_CALL), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id) {
        try {
            if (!id) {
                return { message: "Cannot delete because there are no services with this id." };
            }
            await this.prisma.serviceCall.delete({
                where: { id: id },
            });
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.DeleteError)(error, constants_1.CONTEXT.SERVICE_CALL), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
ServiceCallService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServiceCallService);
exports.ServiceCallService = ServiceCallService;
//# sourceMappingURL=service-call.service.js.map