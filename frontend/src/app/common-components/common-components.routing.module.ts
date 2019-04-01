import { NotFoundComponent } from './not-found/not-found.component';
import { LoginFormComponent } from './../login/components/login-form/login-form.component';

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";


const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "login",
    component: LoginFormComponent
  },
  
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class CommonComponentsRoutingModule {}
