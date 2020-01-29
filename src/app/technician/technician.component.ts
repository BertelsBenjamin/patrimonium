import { Component, OnInit } from "@angular/core";
import { TechnicianService } from "../shared/services/technician.service";
import { Academy } from "../shared/models/academy.model";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

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
  checkboxHQ = new FormControl("");
  HQLabelValue = "";

  getAllAcademies() {
    this.TechnicianService.getAllAcademies().subscribe(
      result => (this.academies = result)
    );
  }

  filterAcademies(hq: any, input: any) {
    hq == true ? (hq = 1) : (hq = 0);
    console.log(hq, input);
    if (hq == "0" && input == "") {
      this.TechnicianService.getAllAcademies().subscribe(
        result => (this.academies = result)
      );
    }
    if (hq == "0" && input !== "") {
      this.TechnicianService.filterAcademiesByInput(input).subscribe(
        result => (this.academies = result)
      );
    }
    if (hq == "1" && input == "") {
      this.TechnicianService.filterAcademiesByHQ(hq).subscribe(
        result => (this.academies = result)
      );
    }
    if (hq == "1" && input !== "") {
      this.TechnicianService.filterAcademiesByHQAndInput(hq, input).subscribe(
        result => (this.academies = result)
      );
    }
  }

  findAcademy(id: number) {
    this.TechnicianService.findAcademy(id).subscribe(
      result => (this.academy = result)
    );
  }

  constructor(
    public TechnicianService: TechnicianService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllAcademies();
  }
}
