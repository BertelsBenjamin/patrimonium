import { Injectable } from "@angular/core";
import { Academy } from "../models/academy.model";
import { Piano } from "../models/piano.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class TechnicianService {
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
    return this.http.get<Academy>(`${this.url}academies/${id}`);
  }

  findPianosByAcademy(academyId: number): Observable<Piano[]> {
    return this.http.get<Piano[]>(`${this.url}pianos/${academyId}`);
  }
}
