import { Component, OnInit } from '@angular/core';
import { Academy } from './shared/models/academy.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'patrimonium';
  academies: Academy[];
  constructor(private http: HttpClient) {
    this.http
      .get<Academy[]>('http://localhost:3306/patrimonium/academies')
      .pipe(
        tap(result => console.log(result))
      )
      .subscribe(academies => this.academies = academies)
  }
}
