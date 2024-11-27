import { IsString } from "class-validator";

/**
 * Data Transfer Object for GetChallengeResponse.
 * This class is used to encapsulate the response data for a challenge request.
 */
export class GetChallengeResponseDto {
    /**
     * The challenge string.
     */
    @IsString({ message: "challenge must be a string" })
    readonly challenge!: string;

    /**
     * Creates an instance of GetChallengeResponseDto from a partial object.
     * @param {Partial<GetChallengeResponseDto>} params - Partial object containing properties to assign.
     * @returns {GetChallengeResponseDto} - A new instance of GetChallengeResponseDto.
     */
    public static of(
        params: Partial<GetChallengeResponseDto>
    ): GetChallengeResponseDto {
        const Dto = new GetChallengeResponseDto();
        Object.assign(Dto, params);
        return Dto;
    }
}
