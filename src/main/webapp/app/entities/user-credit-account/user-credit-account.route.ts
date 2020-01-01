import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCreditAccount } from 'app/shared/model/user-credit-account.model';
import { UserCreditAccountService } from './user-credit-account.service';
import { UserCreditAccountComponent } from './user-credit-account.component';
import { UserCreditAccountDetailComponent } from './user-credit-account-detail.component';
import { UserCreditAccountUpdateComponent } from './user-credit-account-update.component';
import { IUserCreditAccount } from 'app/shared/model/user-credit-account.model';

@Injectable({ providedIn: 'root' })
export class UserCreditAccountResolve implements Resolve<IUserCreditAccount> {
  constructor(private service: UserCreditAccountService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserCreditAccount> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((userCreditAccount: HttpResponse<UserCreditAccount>) => userCreditAccount.body));
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
