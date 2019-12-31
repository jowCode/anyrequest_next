import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRequest } from 'app/shared/model/user-request.model';
import { UserRequestService } from './user-request.service';
import { UserRequestComponent } from './user-request.component';
import { UserRequestDetailComponent } from './user-request-detail.component';
import { UserRequestUpdateComponent } from './user-request-update.component';
import { IUserRequest } from 'app/shared/model/user-request.model';

@Injectable({ providedIn: 'root' })
export class UserRequestResolve implements Resolve<IUserRequest> {
  constructor(private service: UserRequestService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserRequest> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((userRequest: HttpResponse<UserRequest>) => userRequest.body));
    }
    return of(new UserRequest());
  }
}

export const userRequestRoute: Routes = [
  {
    path: '',
    component: UserRequestComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.userRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserRequestDetailComponent,
    resolve: {
      userRequest: UserRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.userRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserRequestUpdateComponent,
    resolve: {
      userRequest: UserRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.userRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserRequestUpdateComponent,
    resolve: {
      userRequest: UserRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.userRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
