import { config } from "@config";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@src/shared/models/error/http.error";
import { JwtService } from "@src/shared/modules/jwt/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request.headers["x-app-secret"] !== config.appSecret) {
            throw new UnauthorizedException("Invalid app secret");
        }

        if (!request.headers.authorization) {
            throw new UnauthorizedException("Authorization is required");
        }

        const payload: { address: string; type: string } | null =
            await this._jwtService.decodeJwt(request.headers.authorization);

        if (!payload) {
            throw new UnauthorizedException("Invalid access token");
        }

        return true;
    }
}
