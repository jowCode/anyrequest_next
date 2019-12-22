import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { AnyrequestNextCoreModule } from 'app/core/core.module';
import { AnyrequestNextAppRoutingModule } from './app-routing.module';
import { AnyrequestNextHomeModule } from './home/home.module';
import { AnyrequestNextEntityModule } from './entities/entity.module';
import { AnyrequestNextSubpagesUserModule } from 'app/subpages-user/subpages-user.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    AnyrequestNextSharedModule,
    AnyrequestNextCoreModule,
    AnyrequestNextHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AnyrequestNextEntityModule,
    AnyrequestNextSubpagesUserModule,
    AnyrequestNextAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class AnyrequestNextAppModule {}
