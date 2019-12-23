import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IUserRequest } from 'app/shared/model/user-request.model';
import { ContributingService } from 'app/subpages-user/contributing/contributing.service';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/animations/route.animations';

@Component({
  selector: 'jhi-contributing',
  templateUrl: './contributing.component.html',
  styleUrls: ['./contributing.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ContributingComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  userRequests: IUserRequest[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

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
    this.reverse = true;
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInUserRequests();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
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

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  registerChangeInUserRequests() {
    this.eventSubscriber = this.eventManager.subscribe('userRequestListModification', () => this.reset());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
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

  protected paginateUserRequests(data: IUserRequest[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.userRequests.push(data[i]);
    }
  }
}
