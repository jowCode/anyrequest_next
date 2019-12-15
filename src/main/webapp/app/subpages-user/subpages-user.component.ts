import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-user-home',
  templateUrl: './subpages-user.component.html'
})
export class SubpagesUserComponent implements OnInit {
  login: string;
  languages: any[];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.identity().subscribe(account => {
      this.login = account.login;
    });
  }
}
