import { LoginFormComponent } from "./login/components/login-form/login-form.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationFormComponent } from "./login/components/registration-form/registration-form.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "login",
    component: LoginFormComponent
  },
  { path: "register", component: RegistrationFormComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {}
