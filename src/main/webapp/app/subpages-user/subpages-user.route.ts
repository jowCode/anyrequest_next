import { Routes } from '@angular/router';
import { SubpagesUserComponent } from 'app/subpages-user/subpages-user.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { requestingRoute } from 'app/subpages-user/requesting/requesting.route';
import { contributingRoute } from 'app/subpages-user/contributing/contributing.route';

export const SUBPAGES_USER_ROUTES = [requestingRoute, contributingRoute];

export const entryPointSubpagesUserRoutes: Routes = [
  {
    path: '',
    component: SubpagesUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subpagesUser.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
