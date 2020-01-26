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

  filterAcademies(input: string, hq: any) {
    // TODO: Fix routing in api/routing/web.php when TechnicianInput goes back to empty.
    // Check commented NgIf in technician.component.html under first <input> tag.
    // This NgIf generates endless calls of getAcademies().
    console.log("input: " + input, "hq: " + hq);
    hq == true ? (hq = 1) : (hq = 0);
    this.TechnicianService.filterAcademies(input, hq).subscribe(
      result => (this.academies = result)
    );
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
    this.getAcademies();
  }
}
