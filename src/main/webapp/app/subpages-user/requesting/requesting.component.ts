import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserRequest } from 'app/shared/model/user-request.model';
import { Subscription } from 'rxjs';
import { UserRequestService } from 'app/entities/user-request/user-request.service';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { UserRequestDeleteDialogComponent } from 'app/entities/user-request/user-request-delete-dialog.component';

@Component({
  selector: 'jhi-requesting',
  templateUrl: './requesting.component.html',
  styleUrls: ['./requesting.component.scss']
})
export class RequestingComponent implements OnInit, OnDestroy {
  userRequests: IUserRequest[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

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
    this.reverse = true;
  }

  loadAll() {
    this.userRequestService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IUserRequest[]>) => this.paginateUserRequests(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.userRequests = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInUserRequests();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserRequest) {
    return item.id;
  }

  registerChangeInUserRequests() {
    this.eventSubscriber = this.eventManager.subscribe('userRequestListModification', () => this.reset());
  }

  delete(userRequest: IUserRequest) {
    const modalRef = this.modalService.open(UserRequestDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userRequest = userRequest;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateUserRequests(data: IUserRequest[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.userRequests.push(data[i]);
    }
  }
}
