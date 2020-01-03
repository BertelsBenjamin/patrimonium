import { Injectable } from "@angular/core";
import { Academy } from "../models/academy.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AcademyService {
  url: string = "http://localhost:8000/api/";
  constructor(private http: HttpClient) {}
  getAcademies(): Observable<Academy[]> {
    return this.http
      .get<Academy[]>(this.url + "academies")
      .pipe(tap(result => console.log("Via service:", result)));
  }
}
