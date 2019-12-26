import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserRequest } from 'app/shared/model/user-request.model';

@Component({
  selector: 'jhi-user-request-detail',
  templateUrl: './contributing-request-detail.component.html'
})
export class ContributingRequestDetailComponent implements OnInit {
  userRequest: IUserRequest;

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
