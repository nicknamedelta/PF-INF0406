import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./app/auth/jwt-auth.guard";
import { AuthModule } from "./app/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./app/user/user.module";
import { DepartmentModule } from "./app/department/department.module";
import { OrganizationModule } from "./app/organization/organization.module";
import { ServiceCallModule } from "./app/service-call/service-call.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        OrganizationModule,
        DepartmentModule,
        UserModule,
        ServiceCallModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
