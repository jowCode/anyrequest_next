import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContributingService } from 'app/subpages-user/contributing/contributing.service';

@Component({
  selector: 'jhi-user-request-detail',
  templateUrl: './contributing-request-detail.component.html'
})
export class ContributingRequestDetailComponent implements OnInit {
  userRequest: any;

  constructor(protected activatedRoute: ActivatedRoute, protected contributingService: ContributingService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userRequest }) => {
      this.userRequest = userRequest;
    });
  }

  previousState() {
    window.history.back();
  }

  contributeToRequest() {
    /* this.contributingService.contribute(this.userRequest);*/
  }
}
