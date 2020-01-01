import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChatMessage } from 'app/shared/model/chat-message.model';
import { ChatMessageService } from './chat-message.service';

@Component({
  templateUrl: './chat-message-delete-dialog.component.html'
})
export class ChatMessageDeleteDialogComponent {
  chatMessage?: IChatMessage;

  constructor(
    protected chatMessageService: ChatMessageService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chatMessageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chatMessageListModification');
      this.activeModal.close();
    });
  }
}
