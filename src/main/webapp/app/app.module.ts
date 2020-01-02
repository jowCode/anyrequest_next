import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import './vendor';
import { AnyrequestNextSharedModule } from 'app/shared/shared.module';
import { AnyrequestNextCoreModule } from 'app/core/core.module';
import { AnyrequestNextAppRoutingModule } from './app-routing.module';
import { AnyrequestNextHomeModule } from './home/home.module';
import { AnyrequestNextEntityModule } from './entities/entity.module';
import { AnyrequestNextSubpagesUserModule } from 'app/subpages-user/subpages-user.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { DropdownModule, IconsModule, NavbarModule, WavesModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AnyrequestNextSharedModule,
    AnyrequestNextCoreModule,
    AnyrequestNextHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AnyrequestNextEntityModule,
    AnyrequestNextSubpagesUserModule,
    AnyrequestNextAppRoutingModule,
    WavesModule,
    DropdownModule,
    IconsModule,
    NavbarModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class AnyrequestNextAppModule {}
