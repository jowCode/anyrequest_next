import { NgModule } from '@angular/core';
import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ContributingComponent } from 'app/subpages-user/contributing/contributing.component';
import { contributingRoute } from 'app/subpages-user/contributing/contributing.route';
import { ContributingRequestDetailComponent } from 'app/subpages-user/contributing/contributing-request-detail.component';
import { ContributeToRequestComponent } from 'app/subpages-user/contributing/contribute-to-request.component';

@NgModule({
  imports: [AnyrequestNextSharedModule, RouterModule.forChild(contributingRoute)],
  declarations: [ContributingComponent, ContributingRequestDetailComponent, ContributeToRequestComponent]
})
export class AnyrequestNextContributingModule {}
