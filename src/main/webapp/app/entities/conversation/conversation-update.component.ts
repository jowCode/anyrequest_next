import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IConversation, Conversation } from 'app/shared/model/conversation.model';
import { ConversationService } from './conversation.service';
import { IContribution } from 'app/shared/model/contribution.model';
import { ContributionService } from 'app/entities/contribution/contribution.service';

@Component({
  selector: 'jhi-conversation-update',
  templateUrl: './conversation-update.component.html'
})
export class ConversationUpdateComponent implements OnInit {
  isSaving: boolean;

  contributions: IContribution[];

  editForm = this.fb.group({
    id: [],
    conversationStatus: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected conversationService: ConversationService,
    protected contributionService: ContributionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ conversation }) => {
      this.updateForm(conversation);
    });
    this.contributionService
      .query()
      .subscribe(
        (res: HttpResponse<IContribution[]>) => (this.contributions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(conversation: IConversation) {
    this.editForm.patchValue({
      id: conversation.id,
      conversationStatus: conversation.conversationStatus
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const conversation = this.createFromForm();
    if (conversation.id !== undefined) {
      this.subscribeToSaveResponse(this.conversationService.update(conversation));
    } else {
      this.subscribeToSaveResponse(this.conversationService.create(conversation));
    }
  }

  private createFromForm(): IConversation {
    return {
      ...new Conversation(),
      id: this.editForm.get(['id']).value,
      conversationStatus: this.editForm.get(['conversationStatus']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConversation>>) {
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

  trackContributionById(index: number, item: IContribution) {
    return item.id;
  }
}
