import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserRequest, UserRequest } from 'app/shared/model/user-request.model';
import { RequestingService } from 'app/subpages-user/requesting/requesting.service';

@Component({
  selector: 'jhi-requesting-new',
  templateUrl: './requesting-new.component.html'
})
export class RequestingNewComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [null, [Validators.required]],
    urgency: [null, [Validators.required]]
  });

  constructor(protected userRequestService: RequestingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userRequest }) => {
      this.updateForm(userRequest);
    });
  }

  updateForm(userRequest: IUserRequest) {
    this.editForm.patchValue({
      id: userRequest.id,
      title: userRequest.title,
      description: userRequest.description,
      urgency: userRequest.urgency
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userRequest = this.createFromForm();
    this.subscribeToSaveResponse(this.userRequestService.create(userRequest));
  }

  private createFromForm(): IUserRequest {
    return {
      ...new UserRequest(),
      id: undefined,
      requestingUser: undefined,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      urgency: this.editForm.get(['urgency']).value,
      validTo: undefined,
      contributorCount: undefined,
      hasContributed: undefined,
      isBlocked: undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserRequest>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
