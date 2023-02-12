import { Controller, Get, Req } from "@nestjs/common";
import { Body, Delete, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { Public } from "src/decorators/public.decorator";
import { OrganizationService } from "./organization.service";
import { OrganizationDto } from "../../dto/organization.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Organization")
@Controller("organization")
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Public()
    @Get("/all")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    findAll() {
        return this.organizationService.findAll();
    }

    @Public()
    @Get("/:cnpj")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
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
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    updateById(@Body() payload, @Param("cnpj") cnpj: string) {
        return this.organizationService.update(cnpj, payload);
    }

    @Public()
    @HttpCode(204)
    @Delete("/delete/:cnpj")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    deleteById(@Param("cnpj") cnpj: string) {
        return this.organizationService.delete(cnpj);
    }
}

