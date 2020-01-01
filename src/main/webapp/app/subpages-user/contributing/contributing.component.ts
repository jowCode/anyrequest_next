import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserRequest } from 'app/shared/model/user-request.model';
import { ContributingService } from 'app/subpages-user/contributing/contributing.service';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { fadeAnimation, listAnimation, transformAnimation } from 'app/core/animations/route.animations';

@Component({
  selector: 'jhi-contributing',
  templateUrl: './contributing.component.html',
  styleUrls: ['./contributing.component.scss'],
  animations: [listAnimation, fadeAnimation, transformAnimation]
})
export class ContributingComponent implements OnInit, OnDestroy {
  userRequests: IUserRequest[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  ascending: boolean;

  constructor(
    protected contributingService: ContributingService,
    protected eventManager: JhiEventManager,
    protected parseLinks: JhiParseLinks
  ) {
    this.userRequests = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInUserRequests();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  loadAll() {
    this.contributingService
      .getAllRequests({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IUserRequest[]>) => this.paginateUserRequests(res.body, res.headers));
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  registerChangeInUserRequests() {
    this.eventSubscriber = this.eventManager.subscribe('userRequestListModification', () => this.reset());
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  reset() {
    this.page = 0;
    this.userRequests = [];
    this.loadAll();
  }

  trackId(index: number, item: IUserRequest) {
    return item.id;
  }

  protected paginateUserRequests(data: IUserRequest[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.userRequests.push(data[i]);
      }
    }
  }
}
