import { IsJWT } from "class-validator";

/**
 * Data Transfer Object (DTO) for handling refresh token requests.
 */
export class RefreshTokenBodyDto {
    /**
     * The refresh token string.
     */
    @IsJWT({ message: "refreshToken must be a JWT string" })
    readonly refreshToken!: string;

    /**
     * Creates an instance of RefreshTokenBodyDto from a partial object.
     * @param {Partial<RefreshTokenBodyDto>} params - Partial object containing properties to assign.
     * @returns {RefreshTokenBodyDto} - A new instance of RefreshTokenBodyDto with assigned properties.
     */
    public static of(
        params: Partial<RefreshTokenBodyDto>
    ): RefreshTokenBodyDto {
        const Dto = new RefreshTokenBodyDto();
        Object.assign(Dto, params);
        return Dto;
    }
}
