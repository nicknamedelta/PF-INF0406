import { Controller, Get, HttpException, HttpStatus, Req } from "@nestjs/common";
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
    @Get("/:id")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    findById(@Param("id") id: string) {
        try {
            return this.departmentService.findById(id);
        } catch (error) {
            throw new HttpException({ error: "No departments are found with this id.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
        }
    }

    @Public()
    @Post("/create")
    create(@Body() departmentDto: DepartmentDto) {
        return this.departmentService.create(departmentDto);
    }

    @Public()
    @Put("/update/:id")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    updateById(@Body() payload, @Param("id") id: string) {
        return this.departmentService.update(id, payload);
    }

    @Public()
    @HttpCode(204)
    @Delete("/delete/:id")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth("token")
    deleteById(@Param("id") id: string) {
        return this.departmentService.delete(id);
    }
}

