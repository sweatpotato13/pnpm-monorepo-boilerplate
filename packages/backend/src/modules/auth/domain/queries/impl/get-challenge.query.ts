import { IQuery } from "@nestjs/cqrs";

export class GetChallengeQuery implements IQuery {
    constructor(public readonly address: string) {}
}
