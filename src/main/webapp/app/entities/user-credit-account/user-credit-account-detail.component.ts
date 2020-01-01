import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserCreditAccount } from 'app/shared/model/user-credit-account.model';

@Component({
  selector: 'jhi-user-credit-account-detail',
  templateUrl: './user-credit-account-detail.component.html'
})
export class UserCreditAccountDetailComponent implements OnInit {
  userCreditAccount: IUserCreditAccount | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userCreditAccount }) => {
      this.userCreditAccount = userCreditAccount;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
