import {Injectable} from '@angular/core';
import { User } from 'src/app/login/models/user.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';



@Injectable({providedIn: 'root'})

export class UserManagmentService{
    baseUrl='http://localhost:3000';
   // users: User[]=[];
    currentUser: User;
  //  $$users = new BehaviorSubject(this.users);
    $$currentUser = new BehaviorSubject(this.currentUser);

    constructor(private http: HttpClient){}

registerUser(val){
    let user = new FormData();
    user.append('firstname', val.firstname);
    user.append('lastname', val.lastname);
    user.append('email', val.email);
    user.append('password', val.password);
return this.http.post<{message:string,response: User}>(`${this.baseUrl}/api/users/register_user`, user)
.pipe(map(data=>{
    return{
        firstname: data.response.firstname,
        lastname: data.response.lastname,
        email: data.response.email
        // will retrieve password at later time
    }
}), catchError(error=>{
    console.log(error);
    return throwError(error)
}))
.subscribe(transformedData=>{
    this.currentUser = transformedData;
    this.$$currentUser.next(this.currentUser);

},
    error=>{
        console.log(error);
        return;
    }
)


}
returnCurrentUserAsObservable(){
    return this.$$currentUser.asObservable();
}


}