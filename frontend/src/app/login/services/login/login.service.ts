import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, of, throwError } from "rxjs";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  isLoggedIn;
  loginStatus: { token: string; expiresAt: any };
  $$loginStatus = new BehaviorSubject(this.isLoggedIn);

  constructor(private http: HttpClient) {}
  login(authData) {
    return this.http
      .post<{ message: string; tokenData: any }>(
        `http://localhost:3000/login`,
        authData
      )
      .pipe(
        map(data => {
          const token = JSON.parse(data.tokenData);
          return {
            token: token.token,
            expiresAt: token.expiresAt
          };
        }),catchError(error=>{
          return throwError(error);
        })
      )
      .subscribe(
        transformedData => {
          this.loginStatus = transformedData;
          this.$$loginStatus.next(true);
          this.setToken(this.loginStatus.token, this.loginStatus.expiresAt);
        },
        error => {
          this.$$loginStatus.next(false);
          console.log(error);
        }
      );
  }
  setToken(token, expirey) {
    localStorage.setItem("expiresAt", expirey);
    localStorage.setItem("token", token);
  }
  getToken(key) {
    return localStorage.getItem(key);
  }
  removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    this.loginStatus = { token: "", expiresAt: "" };
    this.$$loginStatus.next(false);
    return false;
  }
  checkAuth(loginStatus) {
    if (loginStatus.token) {
      if (jwt_decode(loginStatus.token)) {
        const decoded = jwt_decode(loginStatus.token);
        console.log(decoded)
        const now = Date.now();
        if (now < loginStatus.expiresAt) {
          return true;
        } else {
          return this.removeToken;
        }
      } else {
        return this.removeToken;
      }
    } else {
      return false;
    }
  }
  checkStatus() {
    this.loginStatus = {
      token: this.getToken("token"),
      expiresAt: this.getToken("expiresAt")
    };
    if (this.checkAuth(this.loginStatus)) {
      this.$$loginStatus.next(true);
    } else {
      this.$$loginStatus.next(false);
    }
  }

  returnLoginObservable() {
    return this.$$loginStatus.asObservable();
  }
}

// check if beh subject syncs with loginStatus
// get some extra user details
