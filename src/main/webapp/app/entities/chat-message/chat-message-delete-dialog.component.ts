import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChatMessage } from 'app/shared/model/chat-message.model';
import { ChatMessageService } from './chat-message.service';

@Component({
  templateUrl: './chat-message-delete-dialog.component.html'
})
export class ChatMessageDeleteDialogComponent {
  chatMessage: IChatMessage;

  constructor(
    protected chatMessageService: ChatMessageService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.chatMessageService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'chatMessageListModification',
        content: 'Deleted an chatMessage'
      });
      this.activeModal.dismiss(true);
    });
  }
}
