import { Injectable } from "@angular/core";
import { Log } from "../../models/log.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LogsService {
  // VARIABLES
  url: string = "http://localhost:3000/";

  // CONSTRUCTOR
  constructor(private http: HttpClient) {}

  // FUNCTIONS
  getLogs(pianoId: number): Observable<Log[]> {
    return this.http
      .get<Log[]>(`${this.url}logs/${pianoId}`)
      .pipe(tap(result => console.log("TECH_SERVICE: getLogs: ", result)));
  }

  postLog(log: Log) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(`${this.url}logs/post`, log, { headers: headers });
  }
}
