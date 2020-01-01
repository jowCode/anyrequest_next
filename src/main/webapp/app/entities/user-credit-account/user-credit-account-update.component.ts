import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IUserCreditAccount, UserCreditAccount } from 'app/shared/model/user-credit-account.model';
import { UserCreditAccountService } from './user-credit-account.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-user-credit-account-update',
  templateUrl: './user-credit-account-update.component.html'
})
export class UserCreditAccountUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    receivedCredits: [null, [Validators.required, Validators.min(0)]],
    usedCredits: [null, [Validators.required, Validators.min(0)]],
    totalCredits: [null, [Validators.required, Validators.min(0)]],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userCreditAccountService: UserCreditAccountService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userCreditAccount }) => {
      this.updateForm(userCreditAccount);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userCreditAccount: IUserCreditAccount) {
    this.editForm.patchValue({
      id: userCreditAccount.id,
      receivedCredits: userCreditAccount.receivedCredits,
      usedCredits: userCreditAccount.usedCredits,
      totalCredits: userCreditAccount.totalCredits,
      user: userCreditAccount.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      receivedCredits: this.editForm.get(['receivedCredits']).value,
      usedCredits: this.editForm.get(['usedCredits']).value,
      totalCredits: this.editForm.get(['totalCredits']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserCreditAccount>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
