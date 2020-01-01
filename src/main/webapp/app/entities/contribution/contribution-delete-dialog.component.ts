import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContribution } from 'app/shared/model/contribution.model';
import { ContributionService } from './contribution.service';

@Component({
  templateUrl: './contribution-delete-dialog.component.html'
})
export class ContributionDeleteDialogComponent {
  contribution?: IContribution;

  constructor(
    protected contributionService: ContributionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contributionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contributionListModification');
      this.activeModal.close();
    });
  }
}
