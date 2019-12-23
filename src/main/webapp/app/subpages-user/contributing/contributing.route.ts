import { Routes } from '@angular/router';
import { ContributingComponent } from 'app/subpages-user/contributing/contributing.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const contributingRoute: Routes = [
  {
    path: '',
    component: ContributingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'contributing.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
