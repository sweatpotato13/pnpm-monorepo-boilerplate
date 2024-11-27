import { IsJWT } from "class-validator";

/**
 * Data Transfer Object (DTO) for creating a token response.
 */
export class CreateTokenResponseDto {
    /**
     * The access token string.
     */
    @IsJWT({ message: "accessToken must be a JWT string" })
    readonly accessToken!: string;

    /**
     * The refresh token string.
     */
    @IsJWT({ message: "refreshToken must be a JWT string" })
    readonly refreshToken!: string;

    /**
     * Creates an instance of CreateTokenResponseDto from a partial object.
     * @param {Partial<CreateTokenResponseDto>} params - Partial object containing properties of CreateTokenResponseDto.
     * @returns {CreateTokenResponseDto} A new instance of CreateTokenResponseDto.
     */
    public static of(
        params: Partial<CreateTokenResponseDto>
    ): CreateTokenResponseDto {
        const Dto = new CreateTokenResponseDto();
        Object.assign(Dto, params);
        return Dto;
    }
}
