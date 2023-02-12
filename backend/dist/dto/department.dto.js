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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DepartmentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: "Tecnologia da Informação e Comunicação", description: "Its name of department." }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6, { message: "The CNPJ is not filled in correctly. It must be between 6 to 45 characters long." }),
    (0, class_validator_1.MaxLength)(45),
    __metadata("design:type", String)
], DepartmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: "DTIC", description: "Its the acronym of the departments name." }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: "The Abbreviation is not filled in correctly. It must be between 3 to 8 characters long." }),
    (0, class_validator_1.MaxLength)(8),
    __metadata("design:type", String)
], DepartmentDto.prototype, "abbreviation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [1, 2, 3, 4], description: "Its the priority of the task: {1: LOW, 2: MEDIUM, 3: HIGH, 4: CATASTROPHIC}." }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DepartmentDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "Av. Alameda da Flores, Edifício Son Silvestre, Andar 2. 07042-090, Goiânia, GO.",
        description: "Wheres the department is located inside the organization.",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255, { message: "The CNPJ is not filled in correctly. It must be max 255 characters long." }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "place", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Is the uuid of the organization.",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DepartmentDto.prototype, "organizationId", void 0);
exports.DepartmentDto = DepartmentDto;
//# sourceMappingURL=department.dto.js.map