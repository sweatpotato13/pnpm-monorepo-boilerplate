import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtModuleConfig } from "@src/config";
import jwt, { Algorithm } from "jsonwebtoken";

@Injectable()
export class JwtService {
    public userJwtIndex = "activeJwtUsers";

    constructor(
        @Inject(JwtModuleConfig.KEY)
        private readonly _config: ConfigType<typeof JwtModuleConfig>
    ) {}

    public createJwt(address: string): {
        accessToken: string;
        refreshToken: string;
    } {
        const accessTokenPayload = {
            address,
            type: "accessToken"
        };
        const refreshTokenPayload = {
            address,
            type: "refreshToken"
        };
        const accessToken = this.signJwt(accessTokenPayload, true);
        const refreshToken = this.signJwt(refreshTokenPayload, false);
        return { accessToken, refreshToken };
    }

    public signJwt(payload: object, isAccessToken: boolean): string {
        return jwt.sign(payload, this._config.privateKey, {
            algorithm: this._config.algorithm as Algorithm,
            expiresIn: isAccessToken
                ? this._config.accessExpiresIn
                : this._config.refreshExpiresIn
        });
    }

    public async decodeJwt(
        token: string
    ): Promise<{ address: string; type: string } | null> {
        return new Promise(resolve => {
            jwt.verify(
                token,
                this._config.publicKey,
                {
                    algorithms: [this._config.algorithm as Algorithm]
                },
                (err, decoded) => {
                    if (err) return resolve(null);
                    return resolve(
                        decoded as { address: string; type: string }
                    );
                }
            );
        });
    }
}
