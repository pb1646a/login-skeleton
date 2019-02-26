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
    his.tokenData.token = this._loginService.getToken("token");
    this.tokenData.expiresAt = this._loginService.getToken("expiresAt");
    this.isLoggedIn = this._loginService.checkAuth(this.tokenData);
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
