import { UserService } from "./user.service";
import { UserDto } from "../../dto/user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import(".prisma/client").User[] | {
        message: string;
    }>;
    findByEmail(email: string): Promise<import(".prisma/client").User | {
        message: string;
    }>;
    create(userDto: UserDto): Promise<import(".prisma/client").User>;
    updateByEmail(payload: any, email: string): Promise<import(".prisma/client").User | {
        message: string;
    }>;
    deleteByEmail(email: string): Promise<{
        message: string;
    }>;
}
