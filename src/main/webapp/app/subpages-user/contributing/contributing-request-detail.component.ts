import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserRequest } from 'app/shared/model/user-request.model';
import { ContributingService } from 'app/subpages-user/contributing/contributing.service';

@Component({
  selector: 'jhi-user-request-detail',
  templateUrl: './contributing-request-detail.component.html'
})
export class ContributingRequestDetailComponent implements OnInit {
  userRequest: IUserRequest | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected contributingService: ContributingService) {}

  ngOnInit(): any {
    this.activatedRoute.data.subscribe(({ userRequest }) => {
      this.userRequest = userRequest;
    });
  }

  previousState(): any {
    window.history.back();
  }

  contributeToRequest(): any {
    /* this.contributingService.contribute(this.userRequest);*/
  }
}
