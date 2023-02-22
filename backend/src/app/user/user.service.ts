import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "../../dto/user.dto";
import { CONTEXT } from "src/constants";
import { CreateError, DeleteError, GetError, UpdateError } from "src/errors/";
import { ObjectIsEmpty } from "src/utils";
import { OrganizationService } from "../organization/organization.service";
import { DepartmentService } from "../department/department.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private organizationService: OrganizationService, private departamentService: DepartmentService) {}

    async create(dto: UserDto) {
        try {
            const hashedPassword = await bcrypt.hash(dto.password, 10);

            const organization = await this.organizationService.findById(dto.organizationId);
            if (!organization) {
                return { status: 400, error: "Theres no register of an organization with this id." };
            }

            const department = organization.departments.find((item) => item.id === dto.departmentId);

            if (!department) {
                return { status: 400, error: "There are none departments with those id on this organization." };
            }

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
        } catch (error) {
            throw new HttpException(CreateError(error, CONTEXT.USER), HttpStatus.BAD_REQUEST);
        }
    }

    async findAll() {
        let users: User[];

        try {
            users = await this.prisma.user.findMany({
                include: {
                    Department: true,
                    Organization: true,
                },
            });
            users.forEach((user) => {
                delete user.password;
            });

            return users;
        } catch (error) {
            throw new HttpException(GetError(error, CONTEXT.USER), HttpStatus.BAD_REQUEST);
        }
    }

    async findByEmail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });

            delete user.password;
            return user;
        } catch (error) {
            throw new HttpException(GetError(error, CONTEXT.USER), HttpStatus.BAD_REQUEST);
        }
    }

    async update(emailAddress, payload) {
        try {
            if (emailAddress && !ObjectIsEmpty(payload)) {
                return await this.prisma.user.update({
                    where: { email: emailAddress },
                    data: { ...payload, updatedAt: new Date() },
                });
            }

            return { status: 400, error: "Cannot update because there are no users with this email or theres nothing to update." };
        } catch (error) {
            throw new HttpException(UpdateError(error, CONTEXT.USER), HttpStatus.BAD_REQUEST);
        }
    }

    async delete(emailAddress) {
        try {
            if (!emailAddress) {
                return { status: 400, error: "Cannot delete because there are no users with this email." };
            }
            await this.prisma.user.delete({
                where: { email: emailAddress },
            });
        } catch (error) {
            throw new HttpException(DeleteError(error, CONTEXT.USER), HttpStatus.BAD_REQUEST);
        }
    }
}
