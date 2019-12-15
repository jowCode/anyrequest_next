import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubpagesUserComponent } from 'app/subpages-user/subpages-user.component';
import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { entryPointSubpagesUserRoutes, SUBPAGES_USER_ROUTES } from 'app/subpages-user/subpages-user.route';
import { RequestingComponent } from 'app/subpages-user/requesting/requesting.component';
import { ContributingComponent } from 'app/subpages-user/contributing/contributing.component';

@NgModule({
  imports: [AnyrequestNextSharedModule, RouterModule.forChild(SUBPAGES_USER_ROUTES), RouterModule.forChild(entryPointSubpagesUserRoutes)],
  declarations: [SubpagesUserComponent, RequestingComponent, ContributingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubpagesUserModule {}
