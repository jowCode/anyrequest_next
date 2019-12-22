import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Routes } from '@angular/router';
import { IUserRequest, UserRequest } from 'app/shared/model/user-request.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { RequestingComponent } from 'app/subpages-user/requesting/requesting.component';
import { RequestingDetailComponent } from 'app/subpages-user/requesting/requesting-detail.component';
import { RequestingNewComponent } from 'app/subpages-user/requesting/requesting-new.component';
import { RequestingService } from 'app/subpages-user/requesting/requesting.service';

@Injectable({ providedIn: 'root' })
export class UserRequestResolve implements Resolve<IUserRequest> {
  constructor(private service: RequestingService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserRequest> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((userRequest: HttpResponse<UserRequest>) => userRequest.body));
    }
    return of(new UserRequest());
  }
}

export const requestingRoute: Routes = [
  {
    path: '',
    component: RequestingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'requesting.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RequestingDetailComponent,
    resolve: {
      userRequest: UserRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'requesting.detail.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RequestingNewComponent,
    resolve: {
      userRequest: UserRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'requesting.new.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
