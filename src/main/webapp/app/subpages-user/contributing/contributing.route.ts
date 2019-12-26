import { ActivatedRouteSnapshot, Resolve, Routes } from '@angular/router';
import { ContributingComponent } from 'app/subpages-user/contributing/contributing.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Injectable } from '@angular/core';
import { IUserRequest, UserRequest } from 'app/shared/model/user-request.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ContributingService } from 'app/subpages-user/contributing/contributing.service';
import { ContributingRequestDetailComponent } from 'app/subpages-user/contributing/contributing-request-detail.component';

@Injectable({ providedIn: 'root' })
export class AnyUserRequestResolve implements Resolve<IUserRequest> {
  constructor(private service: ContributingService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserRequest> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((userRequest: HttpResponse<UserRequest>) => userRequest.body));
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
