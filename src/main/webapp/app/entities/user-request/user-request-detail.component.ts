import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserRequest } from 'app/shared/model/user-request.model';

@Component({
  selector: 'jhi-user-request-detail',
  templateUrl: './user-request-detail.component.html'
})
export class UserRequestDetailComponent implements OnInit {
  userRequest: IUserRequest | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userRequest }) => {
      this.userRequest = userRequest;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
