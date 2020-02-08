import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserRequest, UserRequest } from 'app/shared/model/user-request.model';
import { UserRequestService } from './user-request.service';
import { UserRequestComponent } from './user-request.component';
import { UserRequestDetailComponent } from './user-request-detail.component';
import { UserRequestUpdateComponent } from './user-request-update.component';

@Injectable({ providedIn: 'root' })
export class UserRequestResolve implements Resolve<IUserRequest> {
  constructor(private service: UserRequestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserRequest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userRequest: HttpResponse<UserRequest>) => {
          if (userRequest.body) {
            return of(userRequest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
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
