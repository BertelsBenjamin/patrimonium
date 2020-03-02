import { Injectable } from "@angular/core";
import { User } from "../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  // VARIABLES
  url: string = "http://localhost:3000";

  // CONSTRUCTOR
  constructor(private http: HttpClient) {}
  user: any;
  // FUNCTIONS
  login(userName: any, userPassword: any): Observable<User> {
    return this.http
      .post<any>(`${this.url}/login`, {
        name: userName,
        password: userPassword
      })
      .pipe(
        tap(result => {
          this.user = result;
          console.log("Login service:\n", result);
        })
      );
  }
}
