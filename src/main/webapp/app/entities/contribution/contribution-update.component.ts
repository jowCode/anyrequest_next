import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IContribution, Contribution } from 'app/shared/model/contribution.model';
import { ContributionService } from './contribution.service';
import { IConversation } from 'app/shared/model/conversation.model';
import { ConversationService } from 'app/entities/conversation/conversation.service';
import { IUserRequest } from 'app/shared/model/user-request.model';
import { UserRequestService } from 'app/entities/user-request/user-request.service';

type SelectableEntity = IConversation | IUserRequest;

@Component({
  selector: 'jhi-contribution-update',
  templateUrl: './contribution-update.component.html'
})
export class ContributionUpdateComponent implements OnInit {
  isSaving = false;
  conversations: IConversation[] = [];
  userrequests: IUserRequest[] = [];

  editForm = this.fb.group({
    id: [],
    contributingUser: [null, [Validators.required]],
    contributionMessage: [null, [Validators.required]],
    contributionStatus: [],
    conversation: [],
    userRequest: []
  });

  constructor(
    protected contributionService: ContributionService,
    protected conversationService: ConversationService,
    protected userRequestService: UserRequestService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contribution }) => {
      this.updateForm(contribution);

      this.conversationService
        .query({ filter: 'contribution-is-null' })
        .pipe(
          map((res: HttpResponse<IConversation[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IConversation[]) => {
          if (!contribution.conversation || !contribution.conversation.id) {
            this.conversations = resBody;
          } else {
            this.conversationService
              .find(contribution.conversation.id)
              .pipe(
                map((subRes: HttpResponse<IConversation>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IConversation[]) => (this.conversations = concatRes));
          }
        });

      this.userRequestService.query().subscribe((res: HttpResponse<IUserRequest[]>) => (this.userrequests = res.body || []));
    });
  }

  updateForm(contribution: IContribution): void {
    this.editForm.patchValue({
      id: contribution.id,
      contributingUser: contribution.contributingUser,
      contributionMessage: contribution.contributionMessage,
      contributionStatus: contribution.contributionStatus,
      conversation: contribution.conversation,
      userRequest: contribution.userRequest
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      contributingUser: this.editForm.get(['contributingUser'])!.value,
      contributionMessage: this.editForm.get(['contributionMessage'])!.value,
      contributionStatus: this.editForm.get(['contributionStatus'])!.value,
      conversation: this.editForm.get(['conversation'])!.value,
      userRequest: this.editForm.get(['userRequest'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContribution>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
