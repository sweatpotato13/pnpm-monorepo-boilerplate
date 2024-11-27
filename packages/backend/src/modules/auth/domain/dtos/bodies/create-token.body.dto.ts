import { IsString } from "class-validator";

/**
 * Data Transfer Object for creating a token.
 */
export class CreateTokenBodyDto {
    /**
     * The address associated with the token.
     */
    @IsString({ message: "address must be a string" })
    readonly address!: string;

    /**
     * The signature associated with the token.
     * @type {string}
     * @throws {Error} Throws an error if the signature is not a valid string.
     */
    @IsString({ message: "signature must be a string" })
    readonly signature!: string;

    /**
     * Creates an instance of CreateTokenBodyDto from a partial object.
     * @param {Partial<CreateTokenBodyDto>} params - Partial object containing properties of CreateTokenBodyDto.
     * @returns {CreateTokenBodyDto} A new instance of CreateTokenBodyDto.
     */
    public static of(params: Partial<CreateTokenBodyDto>): CreateTokenBodyDto {
        const Dto = new CreateTokenBodyDto();
        Object.assign(Dto, params);
        return Dto;
    }
}
