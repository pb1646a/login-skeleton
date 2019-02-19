import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [],
  declarations: [RegistrationFormComponent]
})
export class UserModule {}
