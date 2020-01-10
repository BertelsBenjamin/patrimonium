import { Component, OnInit } from "@angular/core";
import { AcademyService } from "../shared/services/academy.service";
import { Academy } from "../shared/models/academy.model";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-technician",
  templateUrl: "./technician.component.html",
  styleUrls: ["./technician.component.scss"]
})
export class TechnicianComponent implements OnInit {
  academies: Academy[];
  academy: Academy;
  filteredAcademies: Academy[];
  technicianInput = new FormControl("");

  getAcademies() {
    this.AcademyService.getAcademies().subscribe(
      result => (this.academies = result)
    );
  }

  filterAcademies(input) {
    this.academies = this.academies.filter(e => {
      return e.academy_name.includes(input);
    });
  }

  findAcademy(id) {
    this.AcademyService.findAcademy(id).subscribe(
      result => (this.academy = result)
    );
  }

  constructor(public AcademyService: AcademyService) {}

  ngOnInit() {
    this.getAcademies();
  }
}
