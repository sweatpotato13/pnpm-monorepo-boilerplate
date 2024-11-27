/* eslint-disable @typescript-eslint/unbound-method */
import { config as _config } from "dotenv";
_config({ path: __dirname + "/../../.env" });
(process as any).send = process.send || function () {};

import JwtModuleConfig from "./modules/jwt";
import RedisModuleConfig from "./modules/redis";
import TypeOrmModuleConfig from "./modules/typeorm/typeorm";

export { JwtModuleConfig, RedisModuleConfig, TypeOrmModuleConfig };

export const config = {
    // Base
    isProduction: process.env.NODE_ENV === "production",
    // General
    appName: process.env.APP_NAME || "renkei-backend",
    appTitle: process.env.APP_TITLE || "renkei-backend",
    appDescription:
        process.env.APP_DESCRIPTION || "server for subconnect sns server",
    // Server
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT || "8001"),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || "10000"),
    appSecret: process.env.APP_SECRET || "secret",
    chainWsEndpoint: process.env.CHAIN_WS_ENDPOINT || "ws://localhost:9944",
    signerAccountSeed: process.env.SIGNER_ACCOUNT_SEED || "//Alice"
};
