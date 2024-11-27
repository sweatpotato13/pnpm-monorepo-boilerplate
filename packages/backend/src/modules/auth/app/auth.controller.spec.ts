import { Test, TestingModule } from "@nestjs/testing";

import {
    CreateChallengeBodyDto,
    CreateChallengeResponseDto,
    CreateTokenBodyDto,
    CreateTokenResponseDto,
    GetChallengeResponseDto,
    RefreshTokenBodyDto,
    RefreshTokenResponseDto
} from "../domain/dtos";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const mockAuthService: Partial<AuthService> = {
    healthCheck: jest.fn(),
    getChallenge: jest.fn(),
    createChallenge: jest.fn(),
    createToken: jest.fn(),
    refreshToken: jest.fn()
};

describe("AuthController", () => {
    let authController: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: "AuthService", useValue: mockAuthService }]
        }).compile();

        authController = module.get<AuthController>(AuthController);
    });

    it("should be defined", () => {
        expect(authController).toBeDefined();
    });

    describe("GET /challenge", () => {
        it("should return GetChallengeResponseDto", async () => {
            const address: string =
                "0x1234567890123456789012345678901234567890";
            const result: GetChallengeResponseDto = GetChallengeResponseDto.of({
                challenge: "challenge"
            });
            jest.spyOn(mockAuthService, "getChallenge").mockResolvedValue(
                result
            );

            expect(await authController.getChallenge(address)).toBe(result);
        });
    });

    describe("POST /challenge", () => {
        it("should return CreateChallengeResponseDto", async () => {
            const args: CreateChallengeBodyDto = {
                address: "0x1234567890123456789012345678901234567890"
            };
            const result: CreateChallengeResponseDto = {
                challenge: "challenge"
            };
            jest.spyOn(mockAuthService, "createChallenge").mockResolvedValue(
                result
            );

            expect(await authController.createChallenge(args)).toBe(result);
        });
    });

    describe("POST /token", () => {
        it("should return CreateTokenResponseDto", async () => {
            const args: CreateTokenBodyDto = CreateTokenBodyDto.of({
                address: "0x1234567890123456789012345678901234567890",
                signature: "signature"
            });
            const result: CreateTokenResponseDto = CreateTokenResponseDto.of({
                accessToken: "at",
                refreshToken: "rt"
            });
            jest.spyOn(mockAuthService, "createToken").mockResolvedValue(
                result
            );

            expect(await authController.createToken(args)).toBe(result);
        });
    });

    describe("POST /refresh", () => {
        it("should return RefreshTokenResponseDto", async () => {
            const args: RefreshTokenBodyDto = RefreshTokenBodyDto.of({
                refreshToken: "rt"
            });
            const result: RefreshTokenResponseDto = RefreshTokenResponseDto.of({
                accessToken: "newat",
                refreshToken: "newrt"
            });
            jest.spyOn(mockAuthService, "refreshToken").mockResolvedValue(
                result
            );

            expect(await authController.refreshToken(args)).toBe(result);
        });
    });
});
