import { Injectable } from "@angular/core";
import { Academy } from "../models/academy.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { of } from 'rxjs/observable/of';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''
    })
};

@Injectable()
export class AcademyService {
    url = "http://localhost:3306/patrimonium/academies";
    constructor(private http: HttpClient) {

    }
    //GET ALL COUNTRIES
    getAcademies(): Observable<Academy[]> {
        return this.http.get<Academy[]>(this.url, httpOptions).pipe(
            tap(result => console.log(`Via json-server: ${result}`))
        );
    }
    getAcademie(id: number) {
        return this.http.get<Academy[]>(`${this.url}/${id}`);
    }
    addAcademy(newAcademy: Academy) {

    }
    deleteAcademy(academy: Academy) {

    }
}