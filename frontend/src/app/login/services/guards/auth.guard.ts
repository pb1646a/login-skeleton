import { LoginService } from "../login/login.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private _loginService: LoginService, private _router: Router) {}
  tokenData = { token: "", expiresAt: "" };

  isLoggedIn;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.tokenData.token = this._loginService.getToken("token");
    this.tokenData.expiresAt = this._loginService.getToken("expiresAt");
    this.isLoggedIn = this._loginService.checkAuth(this.tokenData);
    if (this.isLoggedIn) {
      return true;
    }
    this._router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
