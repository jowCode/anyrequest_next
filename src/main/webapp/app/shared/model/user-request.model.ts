import { Moment } from 'moment';
import { IContribution } from 'app/shared/model/contribution.model';
import { Urgency } from 'app/shared/model/enumerations/urgency.model';

export interface IUserRequest {
  id?: number;
  requestingUser?: string;
  title?: string;
  description?: string;
  urgency?: Urgency;
  validTo?: Moment;
  contributorCount?: number;
  hasContributed?: boolean;
  isBlocked?: boolean;
  contributions?: IContribution[];
}

export class UserRequest implements IUserRequest {
  constructor(
    public id?: number,
    public requestingUser?: string,
    public title?: string,
    public description?: string,
    public urgency?: Urgency,
    public validTo?: Moment,
    public contributorCount?: number,
    public hasContributed?: boolean,
    public isBlocked?: boolean,
    public contributions?: IContribution[]
  ) {
    this.hasContributed = this.hasContributed || false;
    this.isBlocked = this.isBlocked || false;
  }
}
