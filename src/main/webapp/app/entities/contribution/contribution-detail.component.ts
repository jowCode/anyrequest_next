import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContribution } from 'app/shared/model/contribution.model';

@Component({
  selector: 'jhi-contribution-detail',
  templateUrl: './contribution-detail.component.html'
})
export class ContributionDetailComponent implements OnInit {
  contribution: IContribution;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contribution }) => {
      this.contribution = contribution;
    });
  }

  previousState() {
    window.history.back();
  }
}
