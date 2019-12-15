import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IContribution, Contribution } from 'app/shared/model/contribution.model';
import { ContributionService } from './contribution.service';
import { IConversation } from 'app/shared/model/conversation.model';
import { ConversationService } from 'app/entities/conversation/conversation.service';
import { IUserRequest } from 'app/shared/model/user-request.model';
import { UserRequestService } from 'app/entities/user-request/user-request.service';

@Component({
  selector: 'jhi-contribution-update',
  templateUrl: './contribution-update.component.html'
})
export class ContributionUpdateComponent implements OnInit {
  isSaving: boolean;

  conversations: IConversation[];

  userrequests: IUserRequest[];

  editForm = this.fb.group({
    id: [],
    contributingUser: [null, [Validators.required]],
    contributionMessage: [null, [Validators.required]],
    contributionStatus: [],
    conversation: [],
    userRequest: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected contributionService: ContributionService,
    protected conversationService: ConversationService,
    protected userRequestService: UserRequestService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ contribution }) => {
      this.updateForm(contribution);
    });
    this.conversationService.query({ filter: 'contribution-is-null' }).subscribe(
      (res: HttpResponse<IConversation[]>) => {
        if (!this.editForm.get('conversation').value || !this.editForm.get('conversation').value.id) {
          this.conversations = res.body;
        } else {
          this.conversationService
            .find(this.editForm.get('conversation').value.id)
            .subscribe(
              (subRes: HttpResponse<IConversation>) => (this.conversations = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.userRequestService
      .query()
      .subscribe(
        (res: HttpResponse<IUserRequest[]>) => (this.userrequests = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(contribution: IContribution) {
    this.editForm.patchValue({
      id: contribution.id,
      contributingUser: contribution.contributingUser,
      contributionMessage: contribution.contributionMessage,
      contributionStatus: contribution.contributionStatus,
      conversation: contribution.conversation,
      userRequest: contribution.userRequest
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const contribution = this.createFromForm();
    if (contribution.id !== undefined) {
      this.subscribeToSaveResponse(this.contributionService.update(contribution));
    } else {
      this.subscribeToSaveResponse(this.contributionService.create(contribution));
    }
  }

  private createFromForm(): IContribution {
    return {
      ...new Contribution(),
      id: this.editForm.get(['id']).value,
      contributingUser: this.editForm.get(['contributingUser']).value,
      contributionMessage: this.editForm.get(['contributionMessage']).value,
      contributionStatus: this.editForm.get(['contributionStatus']).value,
      conversation: this.editForm.get(['conversation']).value,
      userRequest: this.editForm.get(['userRequest']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContribution>>) {
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

  trackUserRequestById(index: number, item: IUserRequest) {
    return item.id;
  }
}
