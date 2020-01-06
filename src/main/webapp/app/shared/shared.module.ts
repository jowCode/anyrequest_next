import { NgModule } from '@angular/core';
import { AnyrequestNextSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { ArqPasswordStrengthBarComponent } from 'app/shared/arq-password-strength-meter/arq-password-strength-bar.component';
import { ChangeClassNameDirective } from 'app/shared/arq-password-strength-meter/arq-password-strength-bar.directive';

@NgModule({
  imports: [AnyrequestNextSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    ArqPasswordStrengthBarComponent,
    ChangeClassNameDirective,
    HasAnyAuthorityDirective
  ],
  entryComponents: [LoginModalComponent],
  exports: [
    AnyrequestNextSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    ArqPasswordStrengthBarComponent,
    ChangeClassNameDirective,
    HasAnyAuthorityDirective
  ]
})
export class AnyrequestNextSharedModule {}
