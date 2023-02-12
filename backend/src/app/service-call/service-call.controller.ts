import { Controller, Get, Req } from "@nestjs/common";
import { Body, Delete, HttpCode, Param, Post, Put } from "@nestjs/common/decorators";
import { Public } from "src/decorators/public.decorator";
import { ServiceCallService } from "./service-call.service";
import { ServiceCallDto } from "../../dto/service-call.dto";

@Controller("service-call")
export class ServiceCallController {
    constructor(private readonly serviceCallService: ServiceCallService) {}

    @Public()
    @Get("/")
    findAll() {
        return this.serviceCallService.findAll();
    }

    @Public()
    @Get("/:id")
    findById(@Param("id") id: string) {
        return this.serviceCallService.findById(id);
    }

    @Public()
    @Post("/create")
    create(@Body() serviceCallDto: ServiceCallDto) {
        return this.serviceCallService.create(serviceCallDto);
    }

    @Public()
    @Put("/update/:id")
    updateById(@Body() payload, @Param("id") id: string) {
        return this.serviceCallService.update(id, payload);
    }

    @Public()
    @HttpCode(204)
    @Delete("/delete/:id")
    deleteById(@Param("id") id: string) {
        return this.serviceCallService.delete(id);
    }
}

