import { Controller, Get, Req } from "@nestjs/common";
import { Body, Delete, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { Public } from "src/decorators/public.decorator";
import { DepartmentService } from "./department.service";
import { DepartmentDto } from "../../dto/department.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Department")
@Controller("department")
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Public()
    @Get("/all")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    findAll() {
        return this.departmentService.findAll();
    }

    @Public()
    @Get("/:abbreviation")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    findByAbbreviation(@Param("abbreviation") abbreviation: string) {
        return this.departmentService.findByAbbreviation(abbreviation);
    }

    @Public()
    @Post("/create")
    create(@Body() departmentDto: DepartmentDto) {
        return this.departmentService.create(departmentDto);
    }

    @Public()
    @Put("/update/:abbreviation")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    updateByAbbreviation(@Body() payload, @Param("abbreviation") abbreviation: string) {
        return this.departmentService.update(abbreviation, payload);
    }

    @Public()
    @HttpCode(204)
    @Delete("/delete/:abbreviation")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    deleteByAbbreviation(@Param("abbreviation") abbreviation: string) {
        return this.departmentService.delete(abbreviation);
    }
}

