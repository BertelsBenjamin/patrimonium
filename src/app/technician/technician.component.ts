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

  getAcademies() {
    this.TechnicianService.getAcademies().subscribe(
      result => (this.academies = result)
    );
  }

  filterAcademies(input) {
    this.TechnicianService.filterAcademies(input).subscribe(
      result => (this.academies = result)
    );

    /* this.academies = this.academies.filter(e => {
      return e.academy_name.includes(input);
    }); */
  }

  findAcademy(id) {
    this.TechnicianService.findAcademy(id).subscribe(
      result => (this.academy = result)
    );
  }

  filterHQ(value) {
    value == true ? (value = "1") : (value = "0");
    this.TechnicianService.filterHQ(value).subscribe(
      result => (this.academies = result)
    );
  }

  constructor(
    public TechnicianService: TechnicianService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAcademies();
    this.academies.forEach((a: Academy) => {
      if (a.academy_id == this.route.snapshot.params.id) {
        this.academy = a;
      }
    });
  }
}
