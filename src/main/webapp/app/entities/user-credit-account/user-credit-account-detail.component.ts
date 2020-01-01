import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserCreditAccount } from 'app/shared/model/user-credit-account.model';

@Component({
  selector: 'jhi-user-credit-account-detail',
  templateUrl: './user-credit-account-detail.component.html'
})
export class UserCreditAccountDetailComponent implements OnInit {
  userCreditAccount: IUserCreditAccount;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userCreditAccount }) => {
      this.userCreditAccount = userCreditAccount;
    });
  }

  previousState() {
    window.history.back();
  }
}
