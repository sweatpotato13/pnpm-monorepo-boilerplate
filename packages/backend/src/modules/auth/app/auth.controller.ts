import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Post
} from "@nestjs/common";

import {
    CreateChallengeBodyDto,
    CreateChallengeResponseDto,
    CreateTokenBodyDto,
    CreateTokenResponseDto,
    GetChallengeResponseDto,
    RefreshTokenBodyDto,
    RefreshTokenResponseDto
} from "../domain/dtos";
import { AuthService } from "./auth.service";

/**
 * Controller for handling authentication-related requests.
 */
@Controller("auth")
export class AuthController {
    /**
     * Constructs an instance of AuthController.
     * @param service - The authentication service.
     */
    constructor(@Inject("AuthService") private readonly service: AuthService) {}

    /**
     * Retrieve a challenge for a given user.
     * This challenge is used to sign a message that will be used to authenticate the user.
     * @param args - The parameters for getting the challenge.
     * @returns A promise that resolves to the challenge response.
     *
     * @tag auth
     */
    @Get("challenge/:address")
    @HttpCode(HttpStatus.OK)
    async getChallenge(
        @Param("address") address: string
    ): Promise<GetChallengeResponseDto> {
        try {
            const result = await this.service.getChallenge(address);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a new challenge.
     * @param args - The body parameters for creating the challenge.
     * @returns A promise that resolves to the challenge creation response.
     *
     * @tag auth
     */
    @Post("challenge")
    @HttpCode(HttpStatus.CREATED)
    async createChallenge(
        @Body() args: CreateChallengeBodyDto
    ): Promise<CreateChallengeResponseDto> {
        try {
            const result = await this.service.createChallenge(args);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a new token.
     * @param args - The body parameters for creating the token.
     * @returns A promise that resolves to the token creation response.
     *
     * @tag auth
     */
    @Post("token")
    @HttpCode(HttpStatus.OK)
    async createToken(
        @Body() args: CreateTokenBodyDto
    ): Promise<CreateTokenResponseDto> {
        try {
            const result = await this.service.createToken(args);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Refresh an existing token.
     * @param args - The body parameters for refreshing the token.
     * @returns A promise that resolves to the token refresh response.
     *
     * @tag auth
     */
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    async refreshToken(
        @Body() args: RefreshTokenBodyDto
    ): Promise<RefreshTokenResponseDto> {
        try {
            const result = await this.service.refreshToken(args);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
