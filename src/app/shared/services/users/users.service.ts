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

  filterTechniciansOnDispInput(input) {
    return this.http.get<User[]>(`${this.url}users/filter/${input}`);
  }

  deleteTechnician(id) {
    return this.http.delete(`${this.url}users/technician/delete/${id}`);
  }

  getRoles() {
    return this.http.get(`${this.url}roles`);
  }

  constructor(private http: HttpClient) {}
}
