import { Injectable } from "@angular/core";
import { User } from "src/app/user/models/user.model";
import { BehaviorSubject, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class UserManagmentService {
  baseUrl = environment.backendUrl;
  // users: User[]=[];
  currentUser: User;
  //  $$users = new BehaviorSubject(this.users);
  $$currentUser = new BehaviorSubject(this.currentUser);
  error = { status: "", message: "" };
  $$error = new BehaviorSubject(this.error);

  constructor(private http: HttpClient) {}

  registerUser(val) {
    const user = new FormData();
    user.append("firstname", val.firstname);
    user.append("lastname", val.lastname);
    user.append("email", val.email);
    user.append("password", val.password);
    return this.http
      .post<{ message: string; response: User }>(
        `${this.baseUrl}/api/shared/users/register_user`,
        user
      )
      .pipe(
        map(data => {
          return {
            _id: data.response._id,
            firstname: data.response.firstname,
            lastname: data.response.lastname,
            email: data.response.email,
            password: data.response.password
          };
        }),
        catchError(error => {
          return throwError(error);
        })
      )
      .subscribe(
        transformedData => {
          this.currentUser = transformedData;
          this.$$currentUser.next(this.currentUser);
        },
        error => {
          this.error = error;
          this.$$error.next(this.error);
        }
      );
  }
  returnCurrentUserAsObservable() {
    return this.$$currentUser.asObservable();
  }
  returnErrorAsObservable() {
    return this.$$error.asObservable();
  }
}
