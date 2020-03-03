import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/services/login/login.service";
import { AcademiesService } from "../shared/services/academies/academies.service";
import { Academy } from "../shared/models/academy.model";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-dispatcher",
  templateUrl: "./dispatcher.component.html",
  styleUrls: ["./dispatcher.component.scss"]
})
export class DispatcherComponent implements OnInit {
  // VARIABLES
  academies: Academy[];
  academy: Academy;
  filteredAcademies: Academy[];
  technicianInput = new FormControl("");
  checkboxHQ = new FormControl("");
  HQLabelValue = "";
  user = this.Loginservice.user;

  // CONSTRUCTOR
  constructor(
    public Loginservice: LoginService,
    public AcademiesService: AcademiesService
  ) {}

  // FUNCTIONS
  getAllAcademies() {
    this.AcademiesService.getAllAcademies().subscribe(
      result => (this.academies = result)
    );
  }

  filterAcademies(hq: any, input: any) {
    hq == true ? (hq = 1) : (hq = 0);
    console.log(hq, input);
    if (hq == "0" && input == "") {
      this.AcademiesService.getAllAcademies().subscribe(
        result => (this.academies = result)
      );
    }
    if (hq == "0" && input !== "") {
      this.AcademiesService.filterAcademiesByInput(input).subscribe(
        result => (this.academies = result)
      );
    }
    if (hq == "1" && input == "") {
      this.AcademiesService.filterAcademiesByHQ(hq).subscribe(
        result => (this.academies = result)
      );
    }
    if (hq == "1" && input !== "") {
      this.AcademiesService.filterAcademiesByHQAndInput(hq, input).subscribe(
        result => (this.academies = result)
      );
    }
  }

  findAcademy(id: number) {
    this.AcademiesService.findAcademy(id).subscribe(
      result => (this.academy = result)
    );
  }

  addAcademy() {
    console.log("This function doesn't work yet.");
  }

  ngOnInit() {
    console.log(this.user);
    this.getAllAcademies();
  }
}
