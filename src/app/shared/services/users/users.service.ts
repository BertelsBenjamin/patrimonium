import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  url: string = "http://localhost:3000/";
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users`);
  }

  constructor(private http: HttpClient) {}
}
