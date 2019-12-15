import { IUser } from 'app/core/user/user.model';

export interface IUserCreditAccount {
  id?: number;
  receivedCredits?: number;
  usedCredits?: number;
  totalCredits?: number;
  user?: IUser;
}

export class UserCreditAccount implements IUserCreditAccount {
  constructor(
    public id?: number,
    public receivedCredits?: number,
    public usedCredits?: number,
    public totalCredits?: number,
    public user?: IUser
  ) {}
}
