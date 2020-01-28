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

  ngOnInit(): void {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userRequest }) => {
      this.updateForm(userRequest);
    });
  }

  updateForm(newRequest: INewRequest): void {
    this.editForm.patchValue({
      title: newRequest.title,
      description: newRequest.description,
      urgency: newRequest.urgency
    });
  }

  previousState(): void {
    window.history.back();
  }

  publish(): void {
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
