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

@Component({
  selector: "app-academy",
  templateUrl: "./academy.component.html",
  styleUrls: ["./academy.component.scss"]
})
export class AcademyComponent implements OnInit {
  // VARIABLES
  academy: Academy;
  id: number = this.route.snapshot.params.id;

  //FUNCTIONS
  findAcademy(id: number) {
    console.log(id);
    this.TechnicianService.findAcademy(id).subscribe(
      result => (this.academy = result)
    );
    console.log(this.academy);
  }

  constructor(
    public TechnicianService: TechnicianService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("After OnInit: " + this.id);
    this.findAcademy(this.id);
  }
  /* ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log("afterViewInit: " + this.id);
    this.findAcademy(this.id);
  } */
}
