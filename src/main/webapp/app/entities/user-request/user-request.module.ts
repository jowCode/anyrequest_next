import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { UserRequestComponent } from './user-request.component';
import { UserRequestDetailComponent } from './user-request-detail.component';
import { UserRequestUpdateComponent } from './user-request-update.component';
import { UserRequestDeleteDialogComponent } from './user-request-delete-dialog.component';
import { userRequestRoute } from './user-request.route';

@NgModule({
  imports: [AnyrequestNextSharedModule, RouterModule.forChild(userRequestRoute)],
  declarations: [UserRequestComponent, UserRequestDetailComponent, UserRequestUpdateComponent, UserRequestDeleteDialogComponent],
  entryComponents: [UserRequestDeleteDialogComponent]
})
export class AnyrequestNextUserRequestModule {}
