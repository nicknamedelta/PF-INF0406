import { Controller, Get, Req } from "@nestjs/common";
import { Body, Delete, HttpCode, Param, Post, Put } from "@nestjs/common/decorators";
import { Public } from "src/decorators/public.decorator";
import { OrganizationService } from "./organization.service";
import { OrganizationDto } from "../../dto/organization.dto";

@Controller("organization")
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Public()
    @Get("/")
    findAll() {
        return this.organizationService.findAll();
    }

    @Public()
    @Get("/:cnpj")
    findByCnpj(@Param("cnpj") cnpj: string) {
        return this.organizationService.findByCnpj(cnpj);
    }

    @Public()
    @Post("/create")
    create(@Body() organizationDto: OrganizationDto) {
        return this.organizationService.create(organizationDto);
    }

    @Public()
    @Put("/update/:cnpj")
    updateById(@Body() payload, @Param("cnpj") cnpj: string) {
        return this.organizationService.update(cnpj, payload);
    }

    @Public()
    @HttpCode(204)
    @Delete("/delete/:cnpj")
    deleteById(@Param("cnpj") cnpj: string) {
        return this.organizationService.delete(cnpj);
    }
}

