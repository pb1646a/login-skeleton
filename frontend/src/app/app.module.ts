import { RoutingModule } from "./app.routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LoginModule } from "./login/login.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { TopNavComponent } from "./components/top-nav/top-nav.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from "./login/services/error-interceptor.service";
import { UserModule } from "./user/user.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    TopNavComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    UserModule,

    RoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
