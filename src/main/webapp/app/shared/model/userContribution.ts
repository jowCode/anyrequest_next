export interface IUserContribution {
  requestId?: number;
  contributionMessage?: string;
}

export class UserContribution implements IUserContribution {
  constructor(public requestId?: number, public contributionMessage?: string) {}
}
