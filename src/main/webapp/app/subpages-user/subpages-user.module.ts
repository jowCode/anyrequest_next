import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'requesting',
        loadChildren: () => import('./requesting/requesting.module').then(m => m.AnyrequestNextRequestingModule)
      },
      {
        path: 'contributing',
        loadChildren: () => import('./contributing/contributing.module').then(m => m.AnyrequestNextContributingModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AnyrequestNextSubpagesUserModule {}
