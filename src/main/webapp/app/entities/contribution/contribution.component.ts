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
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

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
    this.ascending = true;
  }

  loadAll(): void {
    this.contributionService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IContribution[]>) => this.paginateContributions(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.contributions = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContributions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContribution): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContributions(): void {
    this.eventSubscriber = this.eventManager.subscribe('contributionListModification', () => this.reset());
  }

  delete(contribution: IContribution): void {
    const modalRef = this.modalService.open(ContributionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contribution = contribution;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateContributions(data: IContribution[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.contributions.push(data[i]);
      }
    }
  }
}
