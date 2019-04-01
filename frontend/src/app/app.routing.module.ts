import { NotFoundComponent } from './common-components/not-found/not-found.component';
import { HomeComponent } from './common-components/home/home.component';
import { LoginFormComponent } from "./login/components/login-form/login-form.component";


import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {}
