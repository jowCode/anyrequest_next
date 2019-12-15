import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conversation } from 'app/shared/model/conversation.model';
import { ConversationService } from './conversation.service';
import { ConversationComponent } from './conversation.component';
import { ConversationDetailComponent } from './conversation-detail.component';
import { ConversationUpdateComponent } from './conversation-update.component';
import { IConversation } from 'app/shared/model/conversation.model';

@Injectable({ providedIn: 'root' })
export class ConversationResolve implements Resolve<IConversation> {
  constructor(private service: ConversationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConversation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((conversation: HttpResponse<Conversation>) => conversation.body));
    }
    return of(new Conversation());
  }
}

export const conversationRoute: Routes = [
  {
    path: '',
    component: ConversationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.conversation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConversationDetailComponent,
    resolve: {
      conversation: ConversationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.conversation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConversationUpdateComponent,
    resolve: {
      conversation: ConversationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.conversation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConversationUpdateComponent,
    resolve: {
      conversation: ConversationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.conversation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
