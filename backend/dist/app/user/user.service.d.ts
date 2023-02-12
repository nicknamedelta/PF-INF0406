import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "../../dto/user.dto";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: UserDto): Promise<User>;
    findAll(): Promise<User[] | {
        message: string;
    }>;
    findByEmail(email: any): Promise<User | {
        message: string;
    }>;
    update(emailAddress: any, payload: any): Promise<User | {
        message: string;
    }>;
    delete(emailAddress: any): Promise<{
        message: string;
    }>;
}
