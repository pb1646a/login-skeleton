import { CommonComponentsModule } from './../common-components/common-components.module';

import { ActivationComponent } from './activation/activation.component';

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginModule } from '../login/login.module';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CommonComponentsModule, LoginModule],
  providers: [],
  declarations: [RegistrationFormComponent, ActivationComponent],
  exports:[]
})
export class UserModule {}
