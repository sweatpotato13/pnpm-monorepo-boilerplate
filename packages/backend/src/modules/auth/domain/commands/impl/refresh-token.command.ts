import { ICommand } from "@nestjs/cqrs";

import { RefreshTokenBodyDto } from "../../dtos";

export class RefreshTokenCommand implements ICommand {
    constructor(public readonly args: RefreshTokenBodyDto) {}
}
