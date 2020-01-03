import { Component, OnInit } from "@angular/core";
import { AcademyService } from "../shared/services/academy.service";
import { Academy } from "../shared/models/academy.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { cors } from "cors";

@Component({
  selector: "app-technician",
  templateUrl: "./technician.component.html",
  styleUrls: ["./technician.component.scss"]
})
export class TechnicianComponent implements OnInit {
  academies: Academy[];
  getAcademies() {
    this.AcademyService.getAcademies().subscribe(
      academies => (this.academies = academies)
    );
  }
  constructor(public AcademyService: AcademyService) {}

  ngOnInit() {
    /* this.http
      .get<Academy>("http://localhost:8000/api/academies")
      .pipe(tap(result => console.log("Opgehaald via API:", result)))
      .subscribe(academies => (this.academies = academies)); */
  }
}
