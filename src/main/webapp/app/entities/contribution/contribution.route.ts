import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contribution } from 'app/shared/model/contribution.model';
import { ContributionService } from './contribution.service';
import { ContributionComponent } from './contribution.component';
import { ContributionDetailComponent } from './contribution-detail.component';
import { ContributionUpdateComponent } from './contribution-update.component';
import { IContribution } from 'app/shared/model/contribution.model';

@Injectable({ providedIn: 'root' })
export class ContributionResolve implements Resolve<IContribution> {
  constructor(private service: ContributionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContribution> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((contribution: HttpResponse<Contribution>) => contribution.body));
    }
    return of(new Contribution());
  }
}

export const contributionRoute: Routes = [
  {
    path: '',
    component: ContributionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.contribution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContributionDetailComponent,
    resolve: {
      contribution: ContributionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.contribution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContributionUpdateComponent,
    resolve: {
      contribution: ContributionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.contribution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContributionUpdateComponent,
    resolve: {
      contribution: ContributionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'anyrequestNextApp.contribution.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
