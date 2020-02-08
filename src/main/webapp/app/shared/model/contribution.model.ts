import { IConversation } from 'app/shared/model/conversation.model';
import { IUserRequest } from 'app/shared/model/user-request.model';
import { ContributionStatus } from 'app/shared/model/enumerations/contribution-status.model';

export interface IContribution {
  id?: number;
  contributingUser?: string;
  contributionMessage?: string;
  contributionStatus?: ContributionStatus;
  conversation?: IConversation;
  userRequest?: IUserRequest;
}

export class Contribution implements IContribution {
  constructor(
    public id?: number,
    public contributingUser?: string,
    public contributionMessage?: string,
    public contributionStatus?: ContributionStatus,
    public conversation?: IConversation,
    public userRequest?: IUserRequest
  ) {}
}
