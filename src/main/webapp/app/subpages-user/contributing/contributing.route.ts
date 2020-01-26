import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { ContributingComponent } from 'app/subpages-user/contributing/contributing.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Injectable } from '@angular/core';
import { IUserRequest, UserRequest } from 'app/shared/model/user-request.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ContributingService } from 'app/subpages-user/contributing/contributing.service';
import { ContributingRequestDetailComponent } from 'app/subpages-user/contributing/contributing-request-detail.component';

@Injectable({ providedIn: 'root' })
export class AnyUserRequestResolve implements Resolve<IUserRequest> {
  constructor(private service: ContributingService, private router: Router) {}

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

export const contributingRoute: Routes = [
  {
    path: '',
    component: ContributingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'contributing.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContributingRequestDetailComponent,
    resolve: {
      userRequest: AnyUserRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'contributing.request.detail.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
