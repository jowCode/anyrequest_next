import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { ContributionComponent } from './contribution.component';
import { ContributionDetailComponent } from './contribution-detail.component';
import { ContributionUpdateComponent } from './contribution-update.component';
import { ContributionDeleteDialogComponent } from './contribution-delete-dialog.component';
import { contributionRoute } from './contribution.route';

@NgModule({
  imports: [AnyrequestNextSharedModule, RouterModule.forChild(contributionRoute)],
  declarations: [ContributionComponent, ContributionDetailComponent, ContributionUpdateComponent, ContributionDeleteDialogComponent],
  entryComponents: [ContributionDeleteDialogComponent]
})
export class AnyrequestNextContributionModule {}
