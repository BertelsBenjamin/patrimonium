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

  addTechnician(technician: User) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(`${this.url}users/technician/post`, technician, {
      headers: headers
    });
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

  getDepartments() {
    return this.http.get(`${this.url}departments`);
  }

  getProvinces() {
    return this.http.get(`${this.url}provinces`);
  }

  getCountries() {
    return this.http.get(`${this.url}countries`);
  }

  getLevels() {
    return this.http.get(`${this.url}levels`);
  }

  constructor(private http: HttpClient) {}
}
