import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContribution, Contribution } from 'app/shared/model/contribution.model';
import { ContributionService } from './contribution.service';
import { ContributionComponent } from './contribution.component';
import { ContributionDetailComponent } from './contribution-detail.component';
import { ContributionUpdateComponent } from './contribution-update.component';

@Injectable({ providedIn: 'root' })
export class ContributionResolve implements Resolve<IContribution> {
  constructor(private service: ContributionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContribution> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contribution: HttpResponse<Contribution>) => {
          if (contribution.body) {
            return of(contribution.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
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
