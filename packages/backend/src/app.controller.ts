import { Controller, Get } from "@nestjs/common";

import { ResultResponseDto } from "./shared/dtos";

@Controller("")
export class AppController {
    constructor() {}

    /**
     * Healthcheck endpoint
     * @returns "OK" string
     *
     * @tag app
     */
    @Get()
    healthCheck(): ResultResponseDto {
        try {
            const result = ResultResponseDto.of({ result: "OK" });
            return result;
        } catch (error) {
            throw error;
        }
    }
}
