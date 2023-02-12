import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "../../dto/user.dto";
import { CONTEXT } from "src/constants";
import { CreateError, DeleteError, GetError, UpdateError } from "src/errors/";
import { ObjectIsEmpty } from "src/utils";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: UserDto) {
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
        } catch (error) {
            throw new HttpException(CreateError(error, CONTEXT.USER), HttpStatus.BAD_REQUEST);
        }
    }

    async findAll() {
        try {
            let users: User[];

            users = await this.prisma.user.findMany();
            if (users.length == 0) {
                return { message: "There are no registered users." };
            }

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

            if (!user) {
                return { message: "There are no users with this email." };
            }

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

            return { message: "Cannot update because there are no users with this email or theres nothing to update." };
        } catch (error) {
            console.log(error);

            throw new HttpException(UpdateError(error, CONTEXT.USER), HttpStatus.BAD_REQUEST);
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
        } catch (error) {
            throw new HttpException(DeleteError(error, CONTEXT.USER), HttpStatus.BAD_REQUEST);
        }
    }
}

