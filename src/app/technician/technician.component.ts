import { Component, OnInit } from "@angular/core";
import { AcademiesService } from "../shared/services/academies/academies.service";
import { Academy } from "../shared/models/academy.model";
import { FormControl } from "@angular/forms";
import { LoginService } from "../shared/services/login/login.service";

@Component({
  selector: "app-technician",
  templateUrl: "./technician.component.html",
  styleUrls: ["./technician.component.scss"],
})
export class TechnicianComponent implements OnInit {
  academies: Academy[];
  academy: Academy;
  filteredAcademies: Academy[];
  technicianInput = new FormControl("");
  checkboxHQ = new FormControl("");
  HQLabelValue = "";
  user = this.LoginService.user;

  getAllAcademies() {
    this.AcademiesService.getAllAcademies().subscribe(
      (result) => (this.academies = result)
    );
  }

  filterAcademies(hq: any, input: any) {
    hq == true ? (hq = 1) : (hq = 0);
    console.log(hq, input);
    if (hq == "0" && input == "") {
      this.AcademiesService.getAllAcademies().subscribe(
        (result) => (this.academies = result)
      );
    }
    if (hq == "0" && input !== "") {
      this.AcademiesService.filterAcademiesByInput(input).subscribe(
        (result) => (this.academies = result)
      );
    }
    if (hq == "1" && input == "") {
      this.AcademiesService.filterAcademiesByHQ(hq).subscribe(
        (result) => (this.academies = result)
      );
    }
    if (hq == "1" && input !== "") {
      this.AcademiesService.filterAcademiesByHQAndInput(hq, input).subscribe(
        (result) => (this.academies = result)
      );
    }
  }

  findAcademy(id: number) {
    this.AcademiesService.findAcademy(id).subscribe(
      (result) => (this.academy = result)
    );
  }

  constructor(
    public AcademiesService: AcademiesService,
    public LoginService: LoginService
  ) {}

  ngOnInit() {
    this.getAllAcademies();
  }
}
