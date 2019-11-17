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
    url = "http://localhost:3306/patrimonium/";
    constructor(private http: HttpClient) {

    }
    //GET ALL COUNTRIES
    getAcademies() {
        return this.http.get(this.url, httpOptions).pipe(
            tap(result => console.log(`Via localhost:3306/patrimonium: ${result}`))
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