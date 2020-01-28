import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserRequest } from 'app/shared/model/user-request.model';
import { Subscription } from 'rxjs';

import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { RequestingService } from 'app/subpages-user/requesting/requesting.service';

@Component({
  selector: 'jhi-requesting',
  templateUrl: './requesting.component.html',
  styleUrls: ['./requesting.component.scss']
})
export class RequestingComponent implements OnInit, OnDestroy {
  userRequests: IUserRequest[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  ascending: boolean;

  constructor(
    protected requestingService: RequestingService,
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

  loadAll(): void {
    this.requestingService
      .queryMyRequests({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IUserRequest[]>) => this.paginateUserRequests(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.userRequests = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserRequests();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserRequest): any {
    return item.id;
  }

  registerChangeInUserRequests(): void {
    this.eventSubscriber = this.eventManager.subscribe('userRequestListModification', () => this.reset());
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
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
