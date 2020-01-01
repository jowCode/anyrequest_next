import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatMessage } from 'app/shared/model/chat-message.model';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageComponent } from './chat-message.component';
import { ChatMessageDetailComponent } from './chat-message-detail.component';
import { ChatMessageUpdateComponent } from './chat-message-update.component';
import { IChatMessage } from 'app/shared/model/chat-message.model';

@Injectable({ providedIn: 'root' })
export class ChatMessageResolve implements Resolve<IChatMessage> {
  constructor(private service: ChatMessageService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChatMessage> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((chatMessage: HttpResponse<ChatMessage>) => chatMessage.body));
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
