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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const public_decorator_1 = require("../../decorators/public.decorator");
const user_service_1 = require("./user.service");
const user_dto_1 = require("../../dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.findAll();
    }
    findByEmail(email) {
        return this.userService.findByEmail(email);
    }
    create(userDto) {
        return this.userService.create(userDto);
    }
    updateByEmail(payload, email) {
        return this.userService.update(email, payload);
    }
    deleteByEmail(email) {
        return this.userService.delete(email);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("/all"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("token"),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns all registered users." }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("/:email"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("token"),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns one registered user by email." }),
    __param(0, (0, decorators_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findByEmail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.Post)("/create"),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Create and returns a registered user." }),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.Put)("/update/:email"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("token"),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Update a registered user data by email." }),
    __param(0, (0, decorators_1.Body)()),
    __param(1, (0, decorators_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateByEmail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.HttpCode)(204),
    (0, decorators_1.Delete)("/delete/:email"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("token"),
    (0, swagger_1.ApiResponse)({ status: 204, description: "Delete a registered user by email." }),
    __param(0, (0, decorators_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteByEmail", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)("User"),
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map