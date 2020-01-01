import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserRequest } from 'app/shared/model/user-request.model';

@Component({
  selector: 'jhi-request-detail',
  templateUrl: './requesting-detail.component.html'
})
export class RequestingDetailComponent implements OnInit {
  userRequest: IUserRequest | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userRequest }) => {
      this.userRequest = userRequest;
    });
  }

  previousState() {
    window.history.back();
  }
}
