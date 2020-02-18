import { Component, OnInit, OnChanges, SimpleChange } from "@angular/core";
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
  currentAcademy: Observable<Academy>;
  currentAcademyPianos: Observable<Piano[]>;

  // PROMISES

  //FUNCTIONS
  getCurrentAcademy(id) {
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
  }

  constructor(
    public TechnicianService: TechnicianService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // GET ACADEMY
    this.getCurrentAcademy(this.route.snapshot.params.id);

    //GET PIANOS FROM ACADEMY
    this.getCurrentAcademyPianos(this.route.snapshot.params.id);

    // LOG RESULTS
    console.log("Current Academy", this.currentAcademy);
    console.log("Current Pianos", this.currentAcademyPianos);
  }
}
