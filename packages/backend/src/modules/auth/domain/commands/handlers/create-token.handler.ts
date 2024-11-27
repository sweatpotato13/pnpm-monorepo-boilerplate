import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Keyring } from "@polkadot/api";
import {
    ForbiddenException,
    NotFoundException
} from "@src/shared/models/error/http.error";
import { JwtService } from "@src/shared/modules/jwt/jwt.service";
import { RedisService } from "@src/shared/modules/redis/redis.service";
import { Inject } from "typedi";

import { CreateTokenResponseDto } from "../../dtos";
import { CreateTokenCommand } from "../impl";

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
    constructor(
        @Inject("RedisService") private readonly redisService: RedisService,
        @Inject("JwtService") private readonly jwtService: JwtService
    ) {}

    async execute(command: CreateTokenCommand) {
        try {
            const { args } = command;
            const { address, signature } = args;

            if (!(await this.redisService.existsKey(address))) {
                throw new NotFoundException("Challenge not found", {
                    context: "CreateTokenHandler"
                });
            }
            const challenge = await this.redisService.get(address);
            await this.redisService.del(address);

            const keyring = new Keyring({ type: "sr25519" });
            const signerKeyring = keyring.addFromAddress(address);

            const isOk = signerKeyring.verify(
                challenge,
                Uint8Array.from(Buffer.from(signature, "hex")),
                signerKeyring.publicKey
            );
            if (!isOk) {
                throw new ForbiddenException("Invalid signature", {
                    context: "CreateTokenHandler"
                });
            }

            const { accessToken, refreshToken } =
                this.jwtService.createJwt(address);

            return CreateTokenResponseDto.of({ accessToken, refreshToken });
        } catch (error: any) {
            throw error;
        }
    }
}
