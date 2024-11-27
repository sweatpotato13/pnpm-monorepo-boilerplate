import { IsJWT } from "class-validator";

/**
 * Data Transfer Object (DTO) for the response containing the refreshed tokens.
 */
export class RefreshTokenResponseDto {
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
     * Creates an instance of RefreshTokenResponseDto with the given parameters.
     * @param {Partial<RefreshTokenResponseDto>} params - Partial parameters to assign to the DTO.
     * @returns {RefreshTokenResponseDto} - The created RefreshTokenResponseDto instance.
     */
    public static of(
        params: Partial<RefreshTokenResponseDto>
    ): RefreshTokenResponseDto {
        const Dto = new RefreshTokenResponseDto();
        Object.assign(Dto, params);
        return Dto;
    }
}
