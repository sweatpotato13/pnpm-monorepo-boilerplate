import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@src/shared/modules";
import { RedisModule } from "@src/shared/modules/redis/redis.module";

import { AuthController } from "./app/auth.controller";
import { AuthService } from "./app/auth.service";
import { CommandHandlers } from "./domain/commands/handlers";
import { QueryHandlers } from "./domain/queries/handlers";

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([]), JwtModule, RedisModule],
    providers: [
        { provide: "AuthService", useClass: AuthService },
        ...CommandHandlers,
        ...QueryHandlers
    ],
    controllers: [AuthController]
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        const {} = consumer;
    }
}
