import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IUserRequest, UserRequest } from 'app/shared/model/user-request.model';
import { ContributingService } from 'app/subpages-user/contributing/contributing.service';

@Component({
  selector: 'jhi-user-request-update',
  templateUrl: './contribute-to-request.component.html'
})
export class ContributeToRequestComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    requestingUser: [null, [Validators.required]],
    title: [null, [Validators.required]],
    description: [null, [Validators.required]],
    urgency: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
    contributorCount: [null, [Validators.required, Validators.min(0)]],
    hasContributed: [],
    isBlocked: []
  });

  constructor(protected contributingService: ContributingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userRequest }) => {
      this.updateForm(userRequest);
    });
  }

  updateForm(userRequest: IUserRequest): void {
    this.editForm.patchValue({
      id: userRequest.id,
      requestingUser: userRequest.requestingUser,
      title: userRequest.title,
      description: userRequest.description,
      urgency: userRequest.urgency,
      validTo: userRequest.validTo != null ? userRequest.validTo.format(DATE_TIME_FORMAT) : null,
      contributorCount: userRequest.contributorCount,
      hasContributed: userRequest.hasContributed,
      isBlocked: userRequest.isBlocked
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userRequest = this.createFromForm();
    /*    if (userRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.userRequestService.update(userRequest));
    } else {
      this.subscribeToSaveResponse(this.userRequestService.create(userRequest));
    }*/
  }

  private createFromForm(): IUserRequest {
    return {
      ...new UserRequest(),
      id: this.editForm.get(['id'])!.value,
      requestingUser: this.editForm.get(['requestingUser'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      urgency: this.editForm.get(['urgency'])!.value,
      validTo: this.editForm.get(['validTo'])!.value != null ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      contributorCount: this.editForm.get(['contributorCount'])!.value,
      hasContributed: this.editForm.get(['hasContributed'])!.value,
      isBlocked: this.editForm.get(['isBlocked'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserRequest>>): void {
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
}
