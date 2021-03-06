import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserRequest } from 'app/shared/model/user-request.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { UserRequestService } from './user-request.service';
import { UserRequestDeleteDialogComponent } from './user-request-delete-dialog.component';

@Component({
  selector: 'jhi-user-request',
  templateUrl: './user-request.component.html'
})
export class UserRequestComponent implements OnInit, OnDestroy {
  userRequests: IUserRequest[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected userRequestService: UserRequestService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
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
    this.userRequestService
      .query({
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

  trackId(index: number, item: IUserRequest): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserRequests(): void {
    this.eventSubscriber = this.eventManager.subscribe('userRequestListModification', () => this.reset());
  }

  delete(userRequest: IUserRequest): void {
    const modalRef = this.modalService.open(UserRequestDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userRequest = userRequest;
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
