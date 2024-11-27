import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@src/shared/modules/jwt/jwt.service";
import { RedisService } from "@src/shared/modules/redis/redis.service";
import { Inject } from "typedi";

import { RefreshTokenResponseDto } from "../../dtos";
import { RefreshTokenCommand } from "../impl";

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
    implements ICommandHandler<RefreshTokenCommand>
{
    constructor(
        @Inject("RedisService") private readonly redisService: RedisService,
        @Inject("JwtService") private readonly jwtService: JwtService
    ) {}

    async execute(command: RefreshTokenCommand) {
        try {
            const { args } = command;
            const oldRefreshToken = args.refreshToken;

            const decodedMessage: { address: string; type: string } =
                await this.jwtService.decodeJwt(oldRefreshToken);

            const { accessToken, refreshToken } = this.jwtService.createJwt(
                decodedMessage.address
            );

            return RefreshTokenResponseDto.of({ accessToken, refreshToken });
        } catch (error: any) {
            throw error;
        }
    }
}
