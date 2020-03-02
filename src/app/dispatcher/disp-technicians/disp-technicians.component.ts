import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/shared/services/login/login.service";

@Component({
  selector: "app-disp-technicians",
  templateUrl: "./disp-technicians.component.html",
  styleUrls: ["./disp-technicians.component.scss"]
})
export class DispTechniciansComponent implements OnInit {
  user = this.LoginService.user;
  constructor(public LoginService: LoginService) {}

  ngOnInit() {}
}
