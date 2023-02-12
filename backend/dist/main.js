"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Backend - GECTI")
        .setDescription("Projeto final da disciplina de Desenvolvimento Full Stack - 2022.2.")
        .setVersion("1.0")
        .addTag("GECTI")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "jwt",
        name: "jwt",
        description: "Enter jwt token:",
        in: "header",
    }, "token")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map