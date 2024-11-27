import { JwtModuleConfig } from "@config";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { JwtService } from "./jwt.service";

@Module({
    imports: [ConfigModule.forFeature(JwtModuleConfig)],
    providers: [JwtService],
    exports: [JwtModule, JwtService]
})
export class JwtModule {}
