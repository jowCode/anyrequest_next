import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserCreditAccount, UserCreditAccount } from 'app/shared/model/user-credit-account.model';
import { UserCreditAccountService } from './user-credit-account.service';
import { UserCreditAccountComponent } from './user-credit-account.component';
import { UserCreditAccountDetailComponent } from './user-credit-account-detail.component';
import { UserCreditAccountUpdateComponent } from './user-credit-account-update.component';

@Injectable({ providedIn: 'root' })
export class UserCreditAccountResolve implements Resolve<IUserCreditAccount> {
  constructor(private service: UserCreditAccountService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserCreditAccount> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userCreditAccount: HttpResponse<UserCreditAccount>) => {
          if (userCreditAccount.body) {
            return of(userCreditAccount.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserCreditAccount());
  }
}

export const userCreditAccountRoute: Routes = [
  {
    path: '',
    component: UserCreditAccountComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'anyrequestNextApp.userCreditAccount.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserCreditAccountDetailComponent,
    resolve: {
      userCreditAccount: UserCreditAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.userCreditAccount.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserCreditAccountUpdateComponent,
    resolve: {
      userCreditAccount: UserCreditAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.userCreditAccount.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserCreditAccountUpdateComponent,
    resolve: {
      userCreditAccount: UserCreditAccountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.userCreditAccount.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
