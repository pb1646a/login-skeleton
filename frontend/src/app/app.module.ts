import { CommonComponentsRoutingModule } from "./common-components/common-components.routing.module";
import { CommonComponentsModule } from "./common-components/common-components.module";
import { UserRoutingModule } from "./user/user.routing.module";

import { RoutingModule } from "./app.routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LoginModule } from "./login/login.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from "./login/services/error-interceptor.service";
import { UserModule } from "./user/user.module";

import { LoginRoutingModule } from "./login/login.routing.module";



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonComponentsModule,
    LoginModule,
    UserModule,
    CommonComponentsRoutingModule,
  
    UserRoutingModule,
 
    LoginRoutingModule,
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
