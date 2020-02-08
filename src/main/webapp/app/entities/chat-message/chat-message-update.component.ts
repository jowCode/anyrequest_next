import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IChatMessage, ChatMessage } from 'app/shared/model/chat-message.model';
import { ChatMessageService } from './chat-message.service';
import { IConversation } from 'app/shared/model/conversation.model';
import { ConversationService } from 'app/entities/conversation/conversation.service';

@Component({
  selector: 'jhi-chat-message-update',
  templateUrl: './chat-message-update.component.html'
})
export class ChatMessageUpdateComponent implements OnInit {
  isSaving = false;

  conversations: IConversation[] = [];

  editForm = this.fb.group({
    id: [],
    owningUser: [null, [Validators.required]],
    message: [null, [Validators.required]],
    conversation: []
  });

  constructor(
    protected chatMessageService: ChatMessageService,
    protected conversationService: ConversationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chatMessage }) => {
      this.updateForm(chatMessage);

      this.conversationService
        .query()
        .pipe(
          map((res: HttpResponse<IConversation[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IConversation[]) => (this.conversations = resBody));
    });
  }

  updateForm(chatMessage: IChatMessage): void {
    this.editForm.patchValue({
      id: chatMessage.id,
      owningUser: chatMessage.owningUser,
      message: chatMessage.message,
      conversation: chatMessage.conversation
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chatMessage = this.createFromForm();
    if (chatMessage.id !== undefined) {
      this.subscribeToSaveResponse(this.chatMessageService.update(chatMessage));
    } else {
      this.subscribeToSaveResponse(this.chatMessageService.create(chatMessage));
    }
  }

  private createFromForm(): IChatMessage {
    return {
      ...new ChatMessage(),
      id: this.editForm.get(['id'])!.value,
      owningUser: this.editForm.get(['owningUser'])!.value,
      message: this.editForm.get(['message'])!.value,
      conversation: this.editForm.get(['conversation'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChatMessage>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IConversation): any {
    return item.id;
  }
}
