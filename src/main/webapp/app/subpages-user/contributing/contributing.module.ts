import { NgModule } from '@angular/core';
import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ContributingComponent } from 'app/subpages-user/contributing/contributing.component';
import { contributingRoute } from 'app/subpages-user/contributing/contributing.route';

@NgModule({
  imports: [AnyrequestNextSharedModule, RouterModule.forChild(contributingRoute)],
  declarations: [ContributingComponent]
})
export class AnyrequestNextContributingModule {}
