import { Controller, Get, Req } from "@nestjs/common";
import { Body, Delete, HttpCode, Param, Post, Put } from "@nestjs/common/decorators";
import { Public } from "src/decorators/public.decorator";
import { UserService } from "./user.service";
import { UserDto } from "../../dto/user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Get("/")
    findAll() {
        return this.userService.findAll();
    }

    @Public()
    @Get("/:email")
    findByEmail(@Param("email") email: string) {
        return this.userService.findByEmail(email);
    }

    @Public()
    @Post("/create")
    create(@Body() userDto: UserDto) {
        return this.userService.create(userDto);
    }

    @Public()
    @Put("/update/:email")
    updateByEmail(@Body() payload, @Param("email") email: string) {
        return this.userService.update(email, payload);
    }

    @Public()
    @HttpCode(204)
    @Delete("/delete/:email")
    deleteByEmail(@Param("email") email: string) {
        return this.userService.delete(email);
    }
}

