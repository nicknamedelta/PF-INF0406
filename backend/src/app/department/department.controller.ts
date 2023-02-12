import { Controller, Get, Req } from "@nestjs/common";
import { Body, Delete, HttpCode, Param, Post, Put } from "@nestjs/common/decorators";
import { Public } from "src/decorators/public.decorator";
import { DepartmentService } from "./department.service";
import { DepartmentDto } from "../../dto/department.dto";

@Controller("department")
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Public()
    @Get("/")
    findAll() {
        return this.departmentService.findAll();
    }

    @Public()
    @Get("/:abbreviation")
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
    updateByAbbreviation(@Body() payload, @Param("abbreviation") abbreviation: string) {
        return this.departmentService.update(abbreviation, payload);
    }

    @Public()
    @HttpCode(204)
    @Delete("/delete/:abbreviation")
    deleteByAbbreviation(@Param("abbreviation") abbreviation: string) {
        return this.departmentService.delete(abbreviation);
    }
}

