import { ICommand } from "@nestjs/cqrs";

import { CreateTokenBodyDto } from "../../dtos";

export class CreateTokenCommand implements ICommand {
    constructor(public readonly args: CreateTokenBodyDto) {}
}
