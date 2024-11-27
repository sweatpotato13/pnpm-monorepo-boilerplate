import { LoggingInterceptor } from "@common/interceptors/logging.interceptor";
import { TypeOrmModuleConfig } from "@config";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import { AppController } from "./app.controller";
import { BadRequestExceptionFilter } from "./common/filters/bad-request-exception.filter";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { TypeOrmConfigService } from "./config/modules/typeorm/typeorm.config.service";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forFeature(TypeOrmModuleConfig)],
            useClass: TypeOrmConfigService
        }),
        /** ------------------ */
        AuthModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: BadRequestExceptionFilter
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class AppModule {
    constructor(private dataSource: DataSource) {
        addTransactionalDataSource(dataSource);
    }
}
