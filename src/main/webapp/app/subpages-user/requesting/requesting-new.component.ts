import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestingService } from 'app/subpages-user/requesting/requesting.service';
import { INewRequest, NewRequest } from 'app/shared/model/new-request.model';
import { IUserRequest } from 'app/shared/model/user-request.model';

@Component({
  selector: 'jhi-requesting-new',
  templateUrl: './requesting-new.component.html'
})
export class RequestingNewComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
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

  updateForm(newRequest: INewRequest) {
    this.editForm.patchValue({
      title: newRequest.title,
      description: newRequest.description,
      urgency: newRequest.urgency
    });
  }

  previousState() {
    window.history.back();
  }

  publish() {
    this.isSaving = true;
    const userRequest = this.createFromForm();
    this.subscribeToSaveResponse(this.userRequestService.publish(userRequest));
  }

  private createFromForm(): INewRequest {
    return {
      ...new NewRequest(),
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      urgency: this.editForm.get(['urgency'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserRequest>>) {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
