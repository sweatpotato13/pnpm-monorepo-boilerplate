import { RedisModuleConfig } from "@config";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { RedisService } from "./redis.service";

@Module({
    imports: [ConfigModule.forFeature(RedisModuleConfig)],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisModule {}
