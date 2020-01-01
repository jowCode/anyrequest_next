import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChatMessage } from 'app/shared/model/chat-message.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageDeleteDialogComponent } from './chat-message-delete-dialog.component';

@Component({
  selector: 'jhi-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  chatMessages: IChatMessage[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected chatMessageService: ChatMessageService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.chatMessages = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.chatMessageService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IChatMessage[]>) => this.paginateChatMessages(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.chatMessages = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChatMessages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChatMessage): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChatMessages(): void {
    this.eventSubscriber = this.eventManager.subscribe('chatMessageListModification', () => this.reset());
  }

  delete(chatMessage: IChatMessage): void {
    const modalRef = this.modalService.open(ChatMessageDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chatMessage = chatMessage;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateChatMessages(data: IChatMessage[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.chatMessages.push(data[i]);
      }
    }
  }
}
