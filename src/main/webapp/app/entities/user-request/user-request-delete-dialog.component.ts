import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserRequest } from 'app/shared/model/user-request.model';
import { UserRequestService } from './user-request.service';

@Component({
  templateUrl: './user-request-delete-dialog.component.html'
})
export class UserRequestDeleteDialogComponent {
  userRequest: IUserRequest;

  constructor(
    protected userRequestService: UserRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'userRequestListModification',
        content: 'Deleted an userRequest'
      });
      this.activeModal.dismiss(true);
    });
  }
}
