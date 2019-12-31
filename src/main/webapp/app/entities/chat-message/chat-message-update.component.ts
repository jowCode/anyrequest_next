import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IChatMessage, ChatMessage } from 'app/shared/model/chat-message.model';
import { ChatMessageService } from './chat-message.service';
import { IConversation } from 'app/shared/model/conversation.model';
import { ConversationService } from 'app/entities/conversation/conversation.service';

@Component({
  selector: 'jhi-chat-message-update',
  templateUrl: './chat-message-update.component.html'
})
export class ChatMessageUpdateComponent implements OnInit {
  isSaving: boolean;

  conversations: IConversation[];

  editForm = this.fb.group({
    id: [],
    owningUser: [null, [Validators.required]],
    message: [null, [Validators.required]],
    conversation: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected chatMessageService: ChatMessageService,
    protected conversationService: ConversationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ chatMessage }) => {
      this.updateForm(chatMessage);
    });
    this.conversationService
      .query()
      .subscribe(
        (res: HttpResponse<IConversation[]>) => (this.conversations = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(chatMessage: IChatMessage) {
    this.editForm.patchValue({
      id: chatMessage.id,
      owningUser: chatMessage.owningUser,
      message: chatMessage.message,
      conversation: chatMessage.conversation
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      owningUser: this.editForm.get(['owningUser']).value,
      message: this.editForm.get(['message']).value,
      conversation: this.editForm.get(['conversation']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChatMessage>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackConversationById(index: number, item: IConversation) {
    return item.id;
  }
}
