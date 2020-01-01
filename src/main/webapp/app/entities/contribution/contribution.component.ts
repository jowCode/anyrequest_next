import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContribution } from 'app/shared/model/contribution.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ContributionService } from './contribution.service';
import { ContributionDeleteDialogComponent } from './contribution-delete-dialog.component';

@Component({
  selector: 'jhi-contribution',
  templateUrl: './contribution.component.html'
})
export class ContributionComponent implements OnInit, OnDestroy {
  contributions: IContribution[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected contributionService: ContributionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.contributions = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.contributionService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IContribution[]>) => this.paginateContributions(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.contributions = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInContributions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IContribution) {
    return item.id;
  }

  registerChangeInContributions() {
    this.eventSubscriber = this.eventManager.subscribe('contributionListModification', () => this.reset());
  }

  delete(contribution: IContribution) {
    const modalRef = this.modalService.open(ContributionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contribution = contribution;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateContributions(data: IContribution[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.contributions.push(data[i]);
    }
  }
}
