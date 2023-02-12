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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const prisma_service_1 = require("../../prisma/prisma.service");
const utils_1 = require("../../utils");
let OrganizationService = class OrganizationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            return await this.prisma.organization.create({
                data: {
                    email: dto.email,
                    name: dto.name,
                    cnpj: dto.cnpj,
                    cellphone: dto.cellphone,
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.CreateError)(error, constants_1.CONTEXT.DEPARTMENT), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            let organizations;
            organizations = await this.prisma.organization.findMany();
            if (organizations.length == 0) {
                return { message: "None organizations have been found." };
            }
            return organizations;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.GetError)(error, constants_1.CONTEXT.ORGANIZATION), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findByCnpj(cnpj) {
        try {
            const organization = await this.prisma.organization.findUnique({
                where: { cnpj },
            });
            if (!organization) {
                return { message: "There are no organizations with this cnpj." };
            }
            return organization;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.GetError)(error, constants_1.CONTEXT.ORGANIZATION), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(cnpj, payload) {
        try {
            if (cnpj && !(0, utils_1.ObjectIsEmpty)(payload)) {
                return await this.prisma.organization.update({
                    where: { cnpj },
                    data: Object.assign(Object.assign({}, payload), { updatedAt: new Date() }),
                });
            }
            return { message: "Cannot update because there are no organizations with this cnpj or theres nothing to update." };
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.UpdateError)(error, constants_1.CONTEXT.ORGANIZATION), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(cnpj) {
        try {
            if (!cnpj) {
                return { message: "Cannot delete because there are no organizations with this cnpj." };
            }
            await this.prisma.organization.delete({
                where: { cnpj },
            });
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.DeleteError)(error, constants_1.CONTEXT.ORGANIZATION), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationService);
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.service.js.map