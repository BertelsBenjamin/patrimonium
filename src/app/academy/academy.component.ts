import { Component, OnInit, OnChanges, SimpleChange } from "@angular/core";
import { Academy } from "../shared/models/academy.model";
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

@Component({
  selector: "app-academy",
  templateUrl: "./academy.component.html",
  styleUrls: ["./academy.component.scss"]
})
export class AcademyComponent implements OnInit {
  // VARIABLES
  currentAcademy;
  currentAcademyPianos;

  //FUNCTIONS
  findCurrentAcademy(academyId: number) {
    return this.TechnicianService.findAcademy(academyId).subscribe(
      result => (this.currentAcademy = result)
    );
  }

  findCurrentPianos(academyId: number) {
    return this.TechnicianService.findPianosByAcademy(academyId).subscribe(
      result => (this.currentAcademyPianos = result)
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
