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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const prisma_service_1 = require("../../prisma/prisma.service");
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const utils_1 = require("../../utils");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    name: dto.name,
                    role: dto.role,
                    userType: dto.userType,
                    organizationId: dto.organizationId,
                    departmentId: dto.departmentId,
                },
            });
            delete user.password;
            return user;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.CreateError)(error, constants_1.CONTEXT.USER), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            let users;
            users = await this.prisma.user.findMany();
            if (users.length == 0) {
                return { message: "There are no registered users." };
            }
            return users;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.GetError)(error, constants_1.CONTEXT.USER), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findByEmail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return { message: "There are no users with this email." };
            }
            delete user.password;
            return user;
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.GetError)(error, constants_1.CONTEXT.USER), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(emailAddress, payload) {
        try {
            if (emailAddress && !(0, utils_1.ObjectIsEmpty)(payload)) {
                return await this.prisma.user.update({
                    where: { email: emailAddress },
                    data: Object.assign(Object.assign({}, payload), { updatedAt: new Date() }),
                });
            }
            return { message: "Cannot update because there are no users with this email or theres nothing to update." };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException((0, errors_1.UpdateError)(error, constants_1.CONTEXT.USER), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(emailAddress) {
        try {
            if (!emailAddress) {
                return { message: "Cannot delete because there are no users with this email." };
            }
            await this.prisma.user.delete({
                where: { email: emailAddress },
            });
        }
        catch (error) {
            throw new common_1.HttpException((0, errors_1.DeleteError)(error, constants_1.CONTEXT.USER), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map