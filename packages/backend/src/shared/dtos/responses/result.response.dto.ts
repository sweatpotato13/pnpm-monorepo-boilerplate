import { IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) for representing a result response.
 */
export class ResultResponseDto {
    /**
     * The result of the response.
     */
    @IsString({ message: "result must be a string" })
    readonly result!: string;

    /**
     * Creates an instance of `ResultResponseDto` from a partial object.
     *
     * @param {Partial<ResultResponseDto>} params - Partial object containing properties to assign to the new instance.
     * @returns {ResultResponseDto} - A new instance of `ResultResponseDto` with the provided properties.
     */
    public static of(params: Partial<ResultResponseDto>): ResultResponseDto {
        const resultResponseDto = new ResultResponseDto();
        Object.assign(resultResponseDto, params);
        return resultResponseDto;
    }
}
