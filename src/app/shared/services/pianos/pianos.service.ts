import { Injectable } from "@angular/core";
import { Piano } from "../../models/piano.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PianosService {
  constructor(private http: HttpClient) {}
  // VARIABLES
  url: string = "http://localhost:3000/";

  //FUNCTIONS
  findPianosByAcademy(academyId: number): Observable<Piano[]> {
    return this.http
      .get<Piano[]>(`${this.url}pianos/${academyId}`)
      .pipe(
        tap(result => console.log("TECH_SERVICE: findPianosByAcademy", result))
      );
  }

  updateRoom(pianoID: number, oldRoom: string, newRoom: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(
      `${this.url}rooms/update`,
      { pianoID: pianoID, oldRoom: oldRoom, newRoom: newRoom },
      { headers: headers }
    );
  }
}
