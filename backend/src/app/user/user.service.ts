import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { ErrorType } from "src/types/ErrorType";
import { UserDto } from "../../dto/user.dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: UserDto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existing) {
            throw new BadRequestException(ErrorType.EmailExists);
        }

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

    async findAll(name?) {
        let users: User[];

        if (!name) {
            return this.prisma.user.findMany();
        } else {
            users = await this.prisma.user.findMany({
                where: { name: { equals: name } },
            });
        }

        if (users.length == 0) {
            return "There are no users with this name.";
        }

        return users;
    }

    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return "There are no user with this email.";
        }

        return user;
    }

    async update(emailAddress, payload) {
        if (!emailAddress || !payload) {
            return "Cannot update because there are no users with this email.";
        }

        return await this.prisma.user.update({ where: { email: emailAddress }, data: payload });
    }

    async delete(emailAddress?) {
        if (!emailAddress) {
            return "Cannot delete because there are no users with this email.";
        }
        await this.prisma.user.delete({
            where: { email: emailAddress },
        });
    }
}

