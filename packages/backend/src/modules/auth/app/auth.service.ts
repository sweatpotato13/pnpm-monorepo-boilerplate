import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import {
    CreateChallengeCommand,
    CreateTokenCommand,
    RefreshTokenCommand
} from "../domain/commands/impl";
import {
    CreateChallengeBodyDto,
    CreateChallengeResponseDto,
    CreateTokenBodyDto,
    CreateTokenResponseDto,
    GetChallengeResponseDto,
    RefreshTokenBodyDto,
    RefreshTokenResponseDto
} from "../domain/dtos";
import { GetChallengeQuery, HealthCheckQuery } from "../domain/queries/impl";

@Injectable()
export class AuthService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    public async healthCheck(): Promise<string> {
        try {
            const result = await this.queryBus.execute(new HealthCheckQuery());
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async getChallenge(
        address: string
    ): Promise<GetChallengeResponseDto> {
        try {
            const result = await this.queryBus.execute(
                new GetChallengeQuery(address)
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async createChallenge(
        args: CreateChallengeBodyDto
    ): Promise<CreateChallengeResponseDto> {
        try {
            const result = await this.commandBus.execute(
                new CreateChallengeCommand(args)
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async createToken(
        args: CreateTokenBodyDto
    ): Promise<CreateTokenResponseDto> {
        try {
            const result = await this.commandBus.execute(
                new CreateTokenCommand(args)
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async refreshToken(
        args: RefreshTokenBodyDto
    ): Promise<RefreshTokenResponseDto> {
        try {
            const result = await this.commandBus.execute(
                new RefreshTokenCommand(args)
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}
