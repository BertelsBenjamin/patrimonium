import { Injectable } from "@angular/core";
import { Academy } from "../models/academy.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class TechnicianService {
  url: string = "http://localhost:8000/api/";
  constructor(private http: HttpClient) {}
  getAcademies(): Observable<Academy[]> {
    return this.http
      .get<Academy[]>(this.url + "academies")
      .pipe(tap(result => console.log("Via service:\n", result)));
  }

  findAcademy(id): Observable<Academy> {
    return this.http
      .get<Academy>(this.url + "academies/" + id)
      .pipe(
        tap(result => console.log("Academy with id " + id + ":\n", result))
      );
  }

  filterAcademies(input, hq): Observable<Academy[]> {
    return this.http
      .get<Academy[]>(this.url + `academies/filter/${hq}/${input}`)
      .pipe(tap(result => console.log("Filtered academies:\n", result)));
  }

  filterHQ(value) {
    return this.http
      .get<Academy[]>(this.url + "academies/filter/hq/" + value)
      .pipe(tap(result => console.log("Academy is HQ:\n", result)));
  }
}
