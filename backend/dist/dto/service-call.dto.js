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
exports.ServiceCallDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ServiceCallDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Its the date info when the card was moved to 2: working." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], ServiceCallDto.prototype, "initiatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Its the date info when the card was moved to 3: finished." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], ServiceCallDto.prototype, "finishedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: "Resolver conexão Wifi Jonas 5G, pois, não está sendo possível acessar a internet através dele.",
        description: "Its a long and detailed description of the service call.",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(14, { message: "The long description is not filled in correctly. It must be between 14 to 255 characters long." }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], ServiceCallDto.prototype, "longDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: "Resolver conexão Wifi Jonas 5G", description: "Its the description of the service call." }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(4, { message: "The long description is not filled in correctly. It must be between 4 to 24 characters long." }),
    (0, class_validator_1.MaxLength)(60),
    __metadata("design:type", String)
], ServiceCallDto.prototype, "shortDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [1, 2, 3], description: "Its the currently state of the service call: {1: to-do, 2: working, 3: finished}." }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ServiceCallDto.prototype, "currentState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [1, 2, 3, 4], description: "Its the priority of the task: {1: LOW, 2: MEDIUM, 3: HIGH, 4: CATASTROPHIC}." }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ServiceCallDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Is the uuid of the user who solicited this service call.",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ServiceCallDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Is the uuid of the organization.",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ServiceCallDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Is the uuid of the department.",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ServiceCallDto.prototype, "departmentId", void 0);
exports.ServiceCallDto = ServiceCallDto;
//# sourceMappingURL=service-call.dto.js.map