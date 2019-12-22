import { NgModule } from '@angular/core';
import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { RequestingComponent } from 'app/subpages-user/requesting/requesting.component';
import { RequestingDetailComponent } from 'app/subpages-user/requesting/requesting-detail.component';
import { RequestingNewComponent } from 'app/subpages-user/requesting/requesting-new.component';
import { requestingRoute } from 'app/subpages-user/requesting/requesting.route';

@NgModule({
  imports: [AnyrequestNextSharedModule, RouterModule.forChild(requestingRoute)],
  declarations: [RequestingComponent, RequestingDetailComponent, RequestingNewComponent]
})
export class AnyrequestNextRequestingModule {}
