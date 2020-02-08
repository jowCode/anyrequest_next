import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserCreditAccount } from 'app/shared/model/user-credit-account.model';
import { UserCreditAccountService } from './user-credit-account.service';

@Component({
  templateUrl: './user-credit-account-delete-dialog.component.html'
})
export class UserCreditAccountDeleteDialogComponent {
  userCreditAccount?: IUserCreditAccount;

  constructor(
    protected userCreditAccountService: UserCreditAccountService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userCreditAccountService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userCreditAccountListModification');
      this.activeModal.close();
    });
  }
}
