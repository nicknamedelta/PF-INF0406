"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const public_decorator_1 = require("../../decorators/public.decorator");
const department_service_1 = require("./department.service");
const department_dto_1 = require("../../dto/department.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    findAll() {
        return this.departmentService.findAll();
    }
    findByAbbreviation(abbreviation) {
        return this.departmentService.findByAbbreviation(abbreviation);
    }
    create(departmentDto) {
        return this.departmentService.create(departmentDto);
    }
    updateByAbbreviation(payload, abbreviation) {
        return this.departmentService.update(abbreviation, payload);
    }
    deleteByAbbreviation(abbreviation) {
        return this.departmentService.delete(abbreviation);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("/all"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("token"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("/:abbreviation"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("token"),
    __param(0, (0, decorators_1.Param)("abbreviation")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "findByAbbreviation", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.Post)("/create"),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_dto_1.DepartmentDto]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.Put)("/update/:abbreviation"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("token"),
    __param(0, (0, decorators_1.Body)()),
    __param(1, (0, decorators_1.Param)("abbreviation")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "updateByAbbreviation", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.HttpCode)(204),
    (0, decorators_1.Delete)("/delete/:abbreviation"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("token"),
    __param(0, (0, decorators_1.Param)("abbreviation")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "deleteByAbbreviation", null);
DepartmentController = __decorate([
    (0, swagger_1.ApiTags)("Department"),
    (0, common_1.Controller)("department"),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map