import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConversation, Conversation } from 'app/shared/model/conversation.model';
import { ConversationService } from './conversation.service';
import { ConversationComponent } from './conversation.component';
import { ConversationDetailComponent } from './conversation-detail.component';
import { ConversationUpdateComponent } from './conversation-update.component';

@Injectable({ providedIn: 'root' })
export class ConversationResolve implements Resolve<IConversation> {
  constructor(private service: ConversationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConversation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((conversation: HttpResponse<Conversation>) => {
          if (conversation.body) {
            return of(conversation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
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
