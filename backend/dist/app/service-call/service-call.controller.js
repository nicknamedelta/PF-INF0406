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
exports.ServiceCallController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const public_decorator_1 = require("../../decorators/public.decorator");
const service_call_service_1 = require("./service-call.service");
const service_call_dto_1 = require("../../dto/service-call.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let ServiceCallController = class ServiceCallController {
    constructor(serviceCallService) {
        this.serviceCallService = serviceCallService;
    }
    findAll() {
        return this.serviceCallService.findAll();
    }
    findById(id) {
        return this.serviceCallService.findById(id);
    }
    create(serviceCallDto) {
        return this.serviceCallService.create(serviceCallDto);
    }
    updateById(payload, id) {
        return this.serviceCallService.update(id, payload);
    }
    deleteById(id) {
        return this.serviceCallService.delete(id);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServiceCallController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("/:id"),
    __param(0, (0, decorators_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceCallController.prototype, "findById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.Post)("/create"),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_call_dto_1.ServiceCallDto]),
    __metadata("design:returntype", void 0)
], ServiceCallController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.Put)("/update/:id"),
    __param(0, (0, decorators_1.Body)()),
    __param(1, (0, decorators_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ServiceCallController.prototype, "updateById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.HttpCode)(204),
    (0, decorators_1.Delete)("/delete/:id"),
    __param(0, (0, decorators_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceCallController.prototype, "deleteById", null);
ServiceCallController = __decorate([
    (0, swagger_1.ApiTags)("Service-call"),
    (0, common_1.Controller)("service-call"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("token"),
    __metadata("design:paramtypes", [service_call_service_1.ServiceCallService])
], ServiceCallController);
exports.ServiceCallController = ServiceCallController;
//# sourceMappingURL=service-call.controller.js.map