import { RegistrationFormComponent } from './registration-form/registration-form.component';

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
 { path: "register", component: RegistrationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule {}
