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
  academyObservable: Observable<any>;
  id: number = this.route.snapshot.params.id;
  currentAcademy: object;

  //FUNCTIONS
  findAcademy(id: number) {
    return this.TechnicianService.findAcademy(id);
  }

  constructor(
    public TechnicianService: TechnicianService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.findAcademy(this.TechnicianService.currentAcademy.academy_id);
    this.currentAcademy = this.TechnicianService.currentAcademy;
    console.log(this.currentAcademy);
  }
}
