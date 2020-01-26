import { Component, OnInit } from "@angular/core";
import { Academy } from "../shared/models/academy.model";
import { TechnicianService } from "../shared/services/technician.service";
import {
  RouterLink,
  Router,
  Routes,
  RouterModule,
  ActivatedRoute
} from "@angular/router";

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
  findAcademy(id) {
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
    this.findAcademy(this.id);
  }
}
