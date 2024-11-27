import { ICommand } from "@nestjs/cqrs";

import { CreateChallengeBodyDto } from "../../dtos";

export class CreateChallengeCommand implements ICommand {
    constructor(public readonly args: CreateChallengeBodyDto) {}
}
