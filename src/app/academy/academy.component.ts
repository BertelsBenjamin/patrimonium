import { Component, OnInit, OnChanges, SimpleChange } from "@angular/core";
import { Academy } from "../shared/models/academy.model";
import { Piano } from "../shared/models/piano.model";
import { TechnicianService } from "../shared/services/technician.service";
import {
  RouterLink,
  Router,
  Routes,
  RouterModule,
  ActivatedRoute
} from "@angular/router";
import { TechnicianComponent } from "../technician/technician.component";
import { Observable } from "rxjs";
import { resolve } from "url";
import { PianoSort } from "../shared/models/piano_sort.model";

@Component({
  selector: "app-academy",
  templateUrl: "./academy.component.html",
  styleUrls: ["./academy.component.scss"]
})
export class AcademyComponent implements OnInit {
  // VARIABLES
  currentAcademy;
  currentAcademyPianos;

  // PROMISES

  //FUNCTIONS
  findCurrentAcademy(academyId: number) {
    return this.TechnicianService.findAcademy(academyId).subscribe(result => {
      this.currentAcademy = result;
      console.log("Current Academy", this.currentAcademy);
    });
  }

  findCurrentPianos(academyId: number) {
    return this.TechnicianService.findPianosByAcademy(academyId).subscribe(
      result => {
        this.currentAcademyPianos = result;
        this.currentAcademy.academy_pianos = this.currentAcademyPianos;
        console.log(this.currentAcademy);
      }
    );
  }

  constructor(
    public TechnicianService: TechnicianService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.findCurrentAcademy(this.TechnicianService.currentAcademy.academy_id);
    this.findCurrentPianos(this.TechnicianService.currentAcademy.academy_id);
    this.currentAcademy = this.TechnicianService.currentAcademy;
    this.currentAcademyPianos = this.TechnicianService.currentAcademyPianos;

    console.log("Current Academy", this.currentAcademy);
    console.log("Current Pianos", this.currentAcademyPianos);
  }
}
