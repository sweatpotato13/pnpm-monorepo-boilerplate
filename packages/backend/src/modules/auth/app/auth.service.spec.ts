import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";

import {
    CreateChallengeCommand,
    CreateTokenCommand,
    RefreshTokenCommand
} from "../domain/commands/impl";
import {
    CreateChallengeBodyDto,
    CreateChallengeResponseDto,
    CreateTokenBodyDto,
    CreateTokenResponseDto,
    GetChallengeResponseDto,
    RefreshTokenBodyDto,
    RefreshTokenResponseDto
} from "../domain/dtos";
import { GetChallengeQuery, HealthCheckQuery } from "../domain/queries/impl";
import { AuthService } from "./auth.service";

const mockCommandBus: Partial<CommandBus> = {
    execute: jest.fn()
};

const mockQueryBus: Partial<QueryBus> = {
    execute: jest.fn()
};

describe("AuthService", () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: CommandBus, useValue: mockCommandBus },
                { provide: QueryBus, useValue: mockQueryBus }
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(authService).toBeDefined();
    });

    describe("healthCheck", () => {
        it("should return a string", async () => {
            const expectedResult = "OK";
            jest.spyOn(mockQueryBus, "execute").mockResolvedValue(
                expectedResult
            );

            const result = await authService.healthCheck();

            expect(result).toBe(expectedResult);
            expect(mockQueryBus.execute).toHaveBeenCalledWith(
                new HealthCheckQuery()
            );
        });

        it("should throw an error if query execution fails", async () => {
            const error = new Error("Query execution failed");
            jest.spyOn(mockQueryBus, "execute").mockRejectedValue(error);

            await expect(authService.healthCheck()).rejects.toThrow(error);
            expect(mockQueryBus.execute).toHaveBeenCalledWith(
                new HealthCheckQuery()
            );
        });
    });

    describe("getChallenge", () => {
        it("should return a GetChallengeResponseDto", async () => {
            const address: string =
                "0x1234567890123456789012345678901234567890";
            const expectedResult: GetChallengeResponseDto =
                GetChallengeResponseDto.of({ challenge: "challenge" });
            jest.spyOn(mockQueryBus, "execute").mockResolvedValue(
                expectedResult
            );

            const result = await authService.getChallenge(address);

            expect(result).toBe(expectedResult);
            expect(mockQueryBus.execute).toHaveBeenCalledWith(
                new GetChallengeQuery(address)
            );
        });

        it("should throw an error if query execution fails", async () => {
            const address: string =
                "0x1234567890123456789012345678901234567890";
            const error = new Error("Query execution failed");
            jest.spyOn(mockQueryBus, "execute").mockRejectedValue(error);

            await expect(authService.getChallenge(address)).rejects.toThrow(
                error
            );
            expect(mockQueryBus.execute).toHaveBeenCalledWith(
                new GetChallengeQuery(address)
            );
        });
    });

    describe("createChallenge", () => {
        it("should return a CreateChallengeResponseDto", async () => {
            const args: CreateChallengeBodyDto = {
                address: "0x1234567890123456789012345678901234567890"
            };
            const expectedResult: CreateChallengeResponseDto = {
                challenge: "challenge"
            };
            jest.spyOn(mockCommandBus, "execute").mockResolvedValue(
                expectedResult
            );

            const result = await authService.createChallenge(args);

            expect(result).toBe(expectedResult);
            expect(mockCommandBus.execute).toHaveBeenCalledWith(
                new CreateChallengeCommand(args)
            );
        });

        it("should throw an error if command execution fails", async () => {
            const args: CreateChallengeBodyDto = {
                address: "0x1234567890123456789012345678901234567890"
            };
            const error = new Error("Command execution failed");
            jest.spyOn(mockCommandBus, "execute").mockRejectedValue(error);

            await expect(authService.createChallenge(args)).rejects.toThrow(
                error
            );
            expect(mockCommandBus.execute).toHaveBeenCalledWith(
                new CreateChallengeCommand(args)
            );
        });
    });

    describe("createToken", () => {
        it("should return a CreateTokenResponseDto", async () => {
            const args: CreateTokenBodyDto = CreateTokenBodyDto.of({
                address: "0x1234567890123456789012345678901234567890",
                signature: "signature"
            });
            const expectedResult: CreateTokenResponseDto =
                CreateTokenResponseDto.of({
                    accessToken: "at",
                    refreshToken: "rt"
                });
            jest.spyOn(mockCommandBus, "execute").mockResolvedValue(
                expectedResult
            );

            const result = await authService.createToken(args);

            expect(result).toBe(expectedResult);
            expect(mockCommandBus.execute).toHaveBeenCalledWith(
                new CreateTokenCommand(args)
            );
        });

        it("should throw an error if command execution fails", async () => {
            const args: CreateTokenBodyDto = CreateTokenBodyDto.of({
                address: "0x1234567890123456789012345678901234567890",
                signature: "signature"
            });
            const error = new Error("Command execution failed");
            jest.spyOn(mockCommandBus, "execute").mockRejectedValue(error);

            await expect(authService.createToken(args)).rejects.toThrow(error);
            expect(mockCommandBus.execute).toHaveBeenCalledWith(
                new CreateTokenCommand(args)
            );
        });
    });

    describe("refreshToken", () => {
        it("should return a RefreshTokenResponseDto", async () => {
            const args: RefreshTokenBodyDto = RefreshTokenBodyDto.of({
                refreshToken: "rt"
            });
            const expectedResult: RefreshTokenResponseDto =
                RefreshTokenResponseDto.of({
                    accessToken: "newat",
                    refreshToken: "newrt"
                });
            jest.spyOn(mockCommandBus, "execute").mockResolvedValue(
                expectedResult
            );

            const result = await authService.refreshToken(args);

            expect(result).toBe(expectedResult);
            expect(mockCommandBus.execute).toHaveBeenCalledWith(
                new RefreshTokenCommand(args)
            );
        });

        it("should throw an error if command execution fails", async () => {
            const args: RefreshTokenBodyDto = RefreshTokenBodyDto.of({
                refreshToken: "rt"
            });
            const error = new Error("Command execution failed");
            jest.spyOn(mockCommandBus, "execute").mockRejectedValue(error);

            await expect(authService.refreshToken(args)).rejects.toThrow(error);
            expect(mockCommandBus.execute).toHaveBeenCalledWith(
                new RefreshTokenCommand(args)
            );
        });
    });
});
