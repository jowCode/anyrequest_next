import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConversation } from 'app/shared/model/conversation.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ConversationService } from './conversation.service';
import { ConversationDeleteDialogComponent } from './conversation-delete-dialog.component';

@Component({
  selector: 'jhi-conversation',
  templateUrl: './conversation.component.html'
})
export class ConversationComponent implements OnInit, OnDestroy {
  conversations: IConversation[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected conversationService: ConversationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.conversations = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.conversationService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IConversation[]>) => this.paginateConversations(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.conversations = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInConversations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConversation) {
    return item.id;
  }

  registerChangeInConversations() {
    this.eventSubscriber = this.eventManager.subscribe('conversationListModification', () => this.reset());
  }

  delete(conversation: IConversation) {
    const modalRef = this.modalService.open(ConversationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.conversation = conversation;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateConversations(data: IConversation[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.conversations.push(data[i]);
    }
  }
}
