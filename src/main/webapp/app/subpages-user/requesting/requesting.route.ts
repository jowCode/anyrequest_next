import { Route } from '@angular/router';
import { RequestingComponent } from 'app/subpages-user/requesting/requesting.component';

export const requestingRoute: Route = {
  path: 'requesting',
  component: RequestingComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'requesting.title'
  }
};
