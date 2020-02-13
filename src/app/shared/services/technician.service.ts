import { Injectable } from "@angular/core";
import { Academy } from "../models/academy.model";
import { Piano } from "../models/piano.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

@Injectable()
export class TechnicianService {
  // VARIABLES
  url: string = "http://localhost:3000/";
  currentAcademy;
  currentAcademyPianos;

  // CONSTRUCTOR
  constructor(private http: HttpClient) {}

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

  findAcademy(id): Observable<Academy> {
    return this.http.get<Academy>(this.url + "academies/" + id).pipe(
      map(result => result[0]),
      tap(
        result => (
          (this.currentAcademy = result), console.log(this.currentAcademy)
        )
      )
    );
  }

  findPianosByAcademy(academyId): Observable<Piano[]> {
    debugger;
    return this.http.get<Piano[]>(`${this.url}pianos/${academyId}`).pipe(
      tap(result => {
        console.log("WORKS!!!!", result);
        this.currentAcademyPianos = result;
      })
    );
  }
}
