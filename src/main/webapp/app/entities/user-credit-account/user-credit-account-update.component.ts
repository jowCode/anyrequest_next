import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserCreditAccount, UserCreditAccount } from 'app/shared/model/user-credit-account.model';
import { UserCreditAccountService } from './user-credit-account.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-user-credit-account-update',
  templateUrl: './user-credit-account-update.component.html'
})
export class UserCreditAccountUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    receivedCredits: [null, [Validators.required, Validators.min(0)]],
    usedCredits: [null, [Validators.required, Validators.min(0)]],
    totalCredits: [null, [Validators.required, Validators.min(0)]],
    user: []
  });

  constructor(
    protected userCreditAccountService: UserCreditAccountService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userCreditAccount }) => {
      this.updateForm(userCreditAccount);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(userCreditAccount: IUserCreditAccount): void {
    this.editForm.patchValue({
      id: userCreditAccount.id,
      receivedCredits: userCreditAccount.receivedCredits,
      usedCredits: userCreditAccount.usedCredits,
      totalCredits: userCreditAccount.totalCredits,
      user: userCreditAccount.user
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userCreditAccount = this.createFromForm();
    if (userCreditAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.userCreditAccountService.update(userCreditAccount));
    } else {
      this.subscribeToSaveResponse(this.userCreditAccountService.create(userCreditAccount));
    }
  }

  private createFromForm(): IUserCreditAccount {
    return {
      ...new UserCreditAccount(),
      id: this.editForm.get(['id'])!.value,
      receivedCredits: this.editForm.get(['receivedCredits'])!.value,
      usedCredits: this.editForm.get(['usedCredits'])!.value,
      totalCredits: this.editForm.get(['totalCredits'])!.value,
      user: this.editForm.get(['user'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserCreditAccount>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
