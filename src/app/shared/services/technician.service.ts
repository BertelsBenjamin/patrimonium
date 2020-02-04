import { Injectable } from "@angular/core";
import { Academy } from "../models/academy.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

@Injectable()
export class TechnicianService {
  url: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {}
  getAllAcademies(): Observable<Academy[]> {
    return this.http
      .get<Academy[]>(this.url + `academies/`)
      .pipe(tap(result => console.log("Via service:\n", result)));
  }

  filterAcademiesByInput(input): Observable<Academy[]> {
    return this.http
      .get<Academy[]>(this.url + `academies/filter/input/${input}`)
      .pipe(tap(result => console.log("Filter by input:\n", result)));
  }

  filterAcademiesByHQ(hq) {
    return this.http
      .get<Academy[]>(this.url + `academies/filter/hq/${hq}`)
      .pipe(tap(result => console.log("Filter by HQ:\n", result)));
  }

  filterAcademiesByHQAndInput(hq, input) {
    return this.http
      .get<Academy[]>(this.url + `academies/filter/hq/${hq}/input/${input}`)
      .pipe(tap(result => console.log("Filter by HQ and Input:\n", result)));
  }

  findAcademy(id): Observable<Academy> {
    return this.http.get<Academy>(this.url + "academies/" + id).pipe(
      map(result => result[0]),
      tap(result =>
        console.log("SERVICE: Academy with id " + id + ":\n", result)
      )
    );
  }
}
