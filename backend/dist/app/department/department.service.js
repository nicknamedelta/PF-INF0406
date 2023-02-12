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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const prisma_service_1 = require("../../prisma/prisma.service");
const utils_1 = require("../../utils");
let DepartmentService = class DepartmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            return await this.prisma.department.create({
                data: {
                    name: dto.name,
                    abbreviation: dto.abbreviation,
                    priority: dto.priority,
                    place: dto.place,
                    organizationId: dto.organizationId,
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.CreateError)(error, constants_1.CONTEXT.USER), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            let departments;
            departments = await this.prisma.department.findMany();
            if (departments.length == 0) {
                return { message: "None departments have been found." };
            }
            return departments;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.GetError)(error, constants_1.CONTEXT.DEPARTMENT), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findByAbbreviation(abbreviation) {
        try {
            const department = await this.prisma.department.findUnique({
                where: { abbreviation },
            });
            if (!department) {
                return { message: "There are no departments with this abbreviation." };
            }
            return department;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.GetError)(error, constants_1.CONTEXT.DEPARTMENT), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(abbreviation, payload) {
        try {
            if (abbreviation && !(0, utils_1.ObjectIsEmpty)(payload)) {
                return await this.prisma.department.update({
                    where: { abbreviation },
                    data: Object.assign(Object.assign({}, payload), { updatedAt: new Date() }),
                });
            }
            return { message: "Cannot update because there are no departments with this abbreviation." };
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.UpdateError)(error, constants_1.CONTEXT.DEPARTMENT), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(abbreviation) {
        try {
            if (!abbreviation) {
                return { message: "Cannot update because there are no departments with this abbreviation or theres nothing to update." };
            }
            await this.prisma.department.delete({
                where: { abbreviation },
            });
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.DeleteError)(error, constants_1.CONTEXT.DEPARTMENT), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentService);
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map