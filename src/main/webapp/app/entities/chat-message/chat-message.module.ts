import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { ChatMessageComponent } from './chat-message.component';
import { ChatMessageDetailComponent } from './chat-message-detail.component';
import { ChatMessageUpdateComponent } from './chat-message-update.component';
import { ChatMessageDeleteDialogComponent } from './chat-message-delete-dialog.component';
import { chatMessageRoute } from './chat-message.route';

@NgModule({
  imports: [AnyrequestNextSharedModule, RouterModule.forChild(chatMessageRoute)],
  declarations: [ChatMessageComponent, ChatMessageDetailComponent, ChatMessageUpdateComponent, ChatMessageDeleteDialogComponent],
  entryComponents: [ChatMessageDeleteDialogComponent]
})
export class AnyrequestNextChatMessageModule {}
