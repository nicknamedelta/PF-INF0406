import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/decorators/public.decorator";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "../../dto/auth-login.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("JWT")
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("/login")
    async login(@Body() authLoginDto: AuthLoginDto) {
        return this.authService.login(authLoginDto);
    }
}
