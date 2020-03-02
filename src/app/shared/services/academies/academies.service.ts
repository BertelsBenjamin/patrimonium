import { Injectable } from "@angular/core";
import { Academy } from "../../models/academy.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AcademiesService {
  // VARIABLES
  url: string = "http://localhost:3000/";

  // CONSTRUCTOR
  constructor(private http: HttpClient) {}

  // RESOLVE

  // FUNCTIONS
  getAllAcademies(): Observable<Academy[]> {
    return this.http
      .get<Academy[]>(this.url + `academies/`)
      .pipe(tap(result => console.log("All academies", result)));
  }

  filterAcademiesByInput(input): Observable<Academy[]> {
    return this.http
      .get<Academy[]>(this.url + `academies/filter/input/${input}`)
      .pipe(tap(result => console.log("Filter by input:\n", result)));
  }

  filterAcademiesByHQ(hq): Observable<Academy[]> {
    return this.http
      .get<Academy[]>(this.url + `academies/filter/hq/${hq}`)
      .pipe(tap(result => console.log("Filter by HQ:\n", result)));
  }

  filterAcademiesByHQAndInput(hq, input) {
    return this.http
      .get<Academy[]>(this.url + `academies/filter/hq/${hq}/input/${input}`)
      .pipe(tap(result => console.log("Filter by HQ and Input:\n", result)));
  }

  findAcademy(id: number): Observable<Academy> {
    return this.http
      .get<Academy>(`${this.url}academies/${id}`)
      .pipe(tap(result => console.log("TECH_SERVICE: findAcademy", result)));
  }
}
