import { LoginService } from 'src/app/login/services/login/login.service';

import { HttpRequest, HttpEvent, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _loginService: LoginService) {}
  tokenData = { token: "", expiresAt: "" };
  isLoggedIn;
  $isLoggedIn: Subscription;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loginService.checkStatus();
    this.$isLoggedIn = this._loginService
      .returnLoginObservable()
      .subscribe(status => {
        if (status) {
          this.isLoggedIn = true;
          this.tokenData = this._loginService.loginStatus;
        } else {
          this.isLoggedIn = false;
        }
      });
    if (this.isLoggedIn) {
      const cloned = req.clone({
        headers: req.headers.set(
          "Authorization",
          "Bearer " + this.tokenData.token
        )
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
