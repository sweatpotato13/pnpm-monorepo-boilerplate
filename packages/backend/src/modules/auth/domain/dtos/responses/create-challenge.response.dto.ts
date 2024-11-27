import { IsString } from "class-validator";

/**
 * Represents the response DTO for creating a challenge.
 */
export class CreateChallengeResponseDto {
    /**
     * The challenge string.
     */
    @IsString({ message: "challenge must be a string" })
    readonly challenge!: string;

    /**
     * Creates an instance of CreateChallengeResponseDto from a partial object.
     * @param params - Partial object containing properties to assign to the new instance.
     * @returns A new instance of CreateChallengeResponseDto with assigned properties.
     */
    public static of(
        params: Partial<CreateChallengeResponseDto>
    ): CreateChallengeResponseDto {
        const Dto = new CreateChallengeResponseDto();
        Object.assign(Dto, params);
        return Dto;
    }
}
