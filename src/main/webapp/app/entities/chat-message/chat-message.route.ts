import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChatMessage, ChatMessage } from 'app/shared/model/chat-message.model';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageComponent } from './chat-message.component';
import { ChatMessageDetailComponent } from './chat-message-detail.component';
import { ChatMessageUpdateComponent } from './chat-message-update.component';

@Injectable({ providedIn: 'root' })
export class ChatMessageResolve implements Resolve<IChatMessage> {
  constructor(private service: ChatMessageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChatMessage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chatMessage: HttpResponse<ChatMessage>) => {
          if (chatMessage.body) {
            return of(chatMessage.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChatMessage());
  }
}

export const chatMessageRoute: Routes = [
  {
    path: '',
    component: ChatMessageComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.chatMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChatMessageDetailComponent,
    resolve: {
      chatMessage: ChatMessageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.chatMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChatMessageUpdateComponent,
    resolve: {
      chatMessage: ChatMessageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.chatMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChatMessageUpdateComponent,
    resolve: {
      chatMessage: ChatMessageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.chatMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
