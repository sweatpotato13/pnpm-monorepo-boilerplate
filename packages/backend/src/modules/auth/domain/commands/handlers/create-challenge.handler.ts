import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RedisService } from "@src/shared/modules/redis/redis.service";
import crypto from "crypto";
import { Inject } from "typedi";

import { CreateChallengeResponseDto } from "../../dtos";
import { CreateChallengeCommand } from "../impl";

@CommandHandler(CreateChallengeCommand)
export class CreateChallengeHandler
    implements ICommandHandler<CreateChallengeCommand>
{
    constructor(
        @Inject("RedisService") private readonly redisService: RedisService
    ) {}

    async execute(command: CreateChallengeCommand) {
        try {
            const { args } = command;
            const { address } = args;

            const challenge = crypto.randomBytes(32).toString("hex");
            await this.redisService.set(address, challenge);

            return CreateChallengeResponseDto.of({ challenge });
        } catch (error: any) {
            throw error;
        }
    }
}
