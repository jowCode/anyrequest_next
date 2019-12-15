import { Route } from '@angular/router';
import { ContributingComponent } from 'app/subpages-user/contributing/contributing.component';

export const contributingRoute: Route = {
  path: 'contributing',
  component: ContributingComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'requesting.title'
  }
};
