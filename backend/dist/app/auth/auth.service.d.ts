import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthLoginDto } from "../../dto/auth-login.dto";
export declare class AuthService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    login(dto: AuthLoginDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        role: string;
        userType: string;
        organizationId: string;
        departmentId: string;
        token: string;
    }>;
}
