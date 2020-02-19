import { Component, OnInit } from "@angular/core";
import { Academy } from "../shared/models/academy.model";
import { Piano } from "../shared/models/piano.model";
import { TechnicianService } from "../shared/services/technician.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-academy",
  templateUrl: "./academy.component.html",
  styleUrls: ["./academy.component.scss"]
})
export class AcademyComponent implements OnInit {
  // VARIABLES
  currentAcademy$: Observable<Academy>;
  currentAcademy: Academy;
  currentAcademyPianos$: Observable<Piano[]>;
  currentAcademyPianos: Piano[];

  // PROMISES

  //FUNCTIONS
  /* getCurrentAcademy(id) {
    this.TechnicianService.findAcademy(id).subscribe(
      result => (
        console.log("Academy: ", result), (this.currentAcademy = result)
      )
    );
  }

  getCurrentAcademyPianos(id) {
    this.TechnicianService.findPianosByAcademy(id).subscribe(
      result => (
        console.log("Pianos: ", result), (this.currentAcademyPianos = result)
      )
    );
  } */

  constructor(
    public TechnicianService: TechnicianService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // GET ACADEMY
    //this.getCurrentAcademy(this.route.snapshot.params.id);

    this.currentAcademy$ = this.TechnicianService.findAcademy(
      this.route.snapshot.params.id
    );
    this.currentAcademy$.subscribe(result => (this.currentAcademy = result));

    //GET PIANOS FROM ACADEMY
    //this.getCurrentAcademyPianos(this.route.snapshot.params.id);
    this.currentAcademyPianos$ = this.TechnicianService.findPianosByAcademy(
      this.route.snapshot.params.id
    );
    this.currentAcademyPianos$.subscribe(
      result => (this.currentAcademyPianos = result)
    );
    // LOG RESULTS
    console.log("Current Academy", this.currentAcademy);
    console.log("Current Pianos", this.currentAcademyPianos$);
  }
}
