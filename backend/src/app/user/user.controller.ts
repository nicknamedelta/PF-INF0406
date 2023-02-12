import { Controller, Get } from "@nestjs/common";
import { Body, Delete, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { Public } from "src/decorators/public.decorator";
import { UserService } from "./user.service";
import { UserDto } from "../../dto/user.dto";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Get("/all")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    @ApiResponse({ status: 200, description: "Returns all registered users." })
    findAll() {
        return this.userService.findAll();
    }

    @Public()
    @Get("/:email")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    @ApiResponse({ status: 200, description: "Returns one registered user by email." })
    findByEmail(@Param("email") email: string) {
        return this.userService.findByEmail(email);
    }

    @Public()
    @Post("/create")
    @ApiResponse({ status: 200, description: "Create and returns a registered user." })
    create(@Body() userDto: UserDto) {
        return this.userService.create(userDto);
    }

    @Public()
    @Put("/update/:email")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    @ApiResponse({ status: 200, description: "Update a registered user data by email." })
    updateByEmail(@Body() payload, @Param("email") email: string) {
        return this.userService.update(email, payload);
    }

    @Public()
    @HttpCode(204)
    @Delete("/delete/:email")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    @ApiResponse({ status: 204, description: "Delete a registered user by email." })
    deleteByEmail(@Param("email") email: string) {
        return this.userService.delete(email);
    }
}

