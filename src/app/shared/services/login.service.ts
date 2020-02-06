import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  // VARIABLES
  url: string = "http://localhost:3000/";

  // CONSTRUCTOR
  constructor(private http: HttpClient) {}

  // FUNCTIONS
  login(userName: any, userPassword: any): Observable<User> {
    console.log("LoginService.login() is being executed");
    return this.http
      .post<any>(`${this.url}/login`, {
        name: userName,
        password: userPassword
      })
      .pipe(tap(result => console.log("Login service:\n", result)));
  }
}
