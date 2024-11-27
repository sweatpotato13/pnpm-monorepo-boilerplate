import { IsString } from "class-validator";

/**
 * Data Transfer Object for creating a challenge.
 */
export class CreateChallengeBodyDto {
    /**
     * The address associated with the challenge.
     */
    @IsString({ message: "address must be a string" })
    readonly address!: string;

    /**
     * Creates an instance of CreateChallengeBodyDto from a partial object.
     * @param {Partial<CreateChallengeBodyDto>} params - Partial object containing properties to assign.
     * @returns {CreateChallengeBodyDto} A new instance of CreateChallengeBodyDto with assigned properties.
     */
    public static of(
        params: Partial<CreateChallengeBodyDto>
    ): CreateChallengeBodyDto {
        const Dto = new CreateChallengeBodyDto();
        Object.assign(Dto, params);
        return Dto;
    }
}
