import { AuthService } from "./auth.service";
import { AuthLoginDto } from "../../dto/auth-login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(authLoginDto: AuthLoginDto): Promise<{
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
