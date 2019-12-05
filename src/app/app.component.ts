import { Component, OnInit } from "@angular/core";
import { Academy } from "./shared/models/academy.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
