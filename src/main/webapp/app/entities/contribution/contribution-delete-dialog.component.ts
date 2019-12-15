import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContribution } from 'app/shared/model/contribution.model';
import { ContributionService } from './contribution.service';

@Component({
  templateUrl: './contribution-delete-dialog.component.html'
})
export class ContributionDeleteDialogComponent {
  contribution: IContribution;

  constructor(
    protected contributionService: ContributionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.contributionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'contributionListModification',
        content: 'Deleted an contribution'
      });
      this.activeModal.dismiss(true);
    });
  }
}
