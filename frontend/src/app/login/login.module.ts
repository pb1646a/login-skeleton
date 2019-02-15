import { AuthInterceptor } from './services/guards/auth.interceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  declarations: [LoginFormComponent, RegistrationFormComponent]
})
export class LoginModule {}
