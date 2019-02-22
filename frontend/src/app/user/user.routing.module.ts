import { ActivationComponent } from './activation/activation.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
  { path: "register/activation/:email/:id", component: ActivationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule {}
