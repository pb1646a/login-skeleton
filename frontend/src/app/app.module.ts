import { RoutingModule } from "./app.routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LoginModule } from "./login/login.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, TopNavComponent],
  imports: [BrowserModule, LoginModule, RoutingModule, HttpClientModule],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
