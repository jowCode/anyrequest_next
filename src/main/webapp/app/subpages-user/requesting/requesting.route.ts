import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { IUserRequest, UserRequest } from 'app/shared/model/user-request.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { RequestingComponent } from 'app/subpages-user/requesting/requesting.component';
import { RequestingDetailComponent } from 'app/subpages-user/requesting/requesting-detail.component';
import { RequestingNewComponent } from 'app/subpages-user/requesting/requesting-new.component';
import { RequestingService } from 'app/subpages-user/requesting/requesting.service';

@Injectable({ providedIn: 'root' })
export class MyUserRequestResolve implements Resolve<IUserRequest> {
  constructor(private service: RequestingService, private router: Router) {}

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

export const requestingRoutes: Routes = [
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
      userRequest: MyUserRequestResolve
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
      userRequest: MyUserRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'requesting.new.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
