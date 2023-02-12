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
exports.OrganizationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OrganizationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ default: "jonasbrothers@getnada.com", description: "Its the email of organization." }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], OrganizationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: "99521209000179", description: "Its the 14 digits organization CNPJ." }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(14, { message: "The CNPJ is not filled in correctly. It must be 14 characters long." }),
    (0, class_validator_1.MaxLength)(14),
    __metadata("design:type", String)
], OrganizationDto.prototype, "cnpj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: "IBM Not Factorys", description: "Its the organization fantasy name." }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(45, { message: "The organization name is not filled in correctly. It must be max 45 characters long." }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: "18004262255", description: "Its the organization cellphone." }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(11, { message: "The cellphone is not filled in correctly. It must be max 11 characters long." }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "cellphone", void 0);
exports.OrganizationDto = OrganizationDto;
//# sourceMappingURL=organization.dto.js.map