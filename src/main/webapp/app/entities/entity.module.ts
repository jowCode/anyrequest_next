import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user-request',
        loadChildren: () => import('./user-request/user-request.module').then(m => m.AnyrequestNextUserRequestModule)
      },
      {
        path: 'contribution',
        loadChildren: () => import('./contribution/contribution.module').then(m => m.AnyrequestNextContributionModule)
      },
      {
        path: 'user-credit-account',
        loadChildren: () => import('./user-credit-account/user-credit-account.module').then(m => m.AnyrequestNextUserCreditAccountModule)
      },
      {
        path: 'conversation',
        loadChildren: () => import('./conversation/conversation.module').then(m => m.AnyrequestNextConversationModule)
      },
      {
        path: 'chat-message',
        loadChildren: () => import('./chat-message/chat-message.module').then(m => m.AnyrequestNextChatMessageModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AnyrequestNextEntityModule {}
