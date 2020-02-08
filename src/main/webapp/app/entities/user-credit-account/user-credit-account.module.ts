import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { UserCreditAccountComponent } from './user-credit-account.component';
import { UserCreditAccountDetailComponent } from './user-credit-account-detail.component';
import { UserCreditAccountUpdateComponent } from './user-credit-account-update.component';
import { UserCreditAccountDeleteDialogComponent } from './user-credit-account-delete-dialog.component';
import { userCreditAccountRoute } from './user-credit-account.route';

@NgModule({
  imports: [AnyrequestNextSharedModule, RouterModule.forChild(userCreditAccountRoute)],
  declarations: [
    UserCreditAccountComponent,
    UserCreditAccountDetailComponent,
    UserCreditAccountUpdateComponent,
    UserCreditAccountDeleteDialogComponent
  ],
  entryComponents: [UserCreditAccountDeleteDialogComponent]
})
export class AnyrequestNextUserCreditAccountModule {}
