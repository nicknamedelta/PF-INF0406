import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle("Backend - GECTI")
        .setDescription("Projeto final da disciplina de Desenvolvimento Full Stack - 2022.2.")
        .setVersion("1.0")
        .addTag("GECTI")
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                bearerFormat: "jwt",
                name: "jwt",
                description: "Enter jwt token:",
                in: "header",
            },
            "token",
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(3000);
}
bootstrap();

