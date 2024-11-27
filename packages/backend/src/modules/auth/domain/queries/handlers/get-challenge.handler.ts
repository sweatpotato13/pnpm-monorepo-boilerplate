import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@src/shared/models/error/http.error";
import { RedisService } from "@src/shared/modules/redis/redis.service";
import { Inject } from "typedi";

import { GetChallengeResponseDto } from "../../dtos";
import { GetChallengeQuery } from "../impl";

@QueryHandler(GetChallengeQuery)
export class GetChallengeHandler implements IQueryHandler<GetChallengeQuery> {
    constructor(
        @Inject("RedisService") private readonly redisService: RedisService
    ) {}

    async execute(command: GetChallengeQuery) {
        try {
            const { address } = command;

            if (!(await this.redisService.existsKey(address))) {
                throw new NotFoundException("Challenge not found", {
                    context: "GetChallengeHandler"
                });
            }
            const challenge = await this.redisService.get(address);

            if (!challenge) {
                throw new NotFoundException("Challenge not found", {
                    context: "GetChallengeHandler"
                });
            }

            return GetChallengeResponseDto.of({ challenge });
        } catch (error: any) {
            throw error;
        }
    }
}
