import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/services/login.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.scss"]
})
export class ManagerComponent implements OnInit {
  constructor(public LoginService: LoginService) {}

  user = this.LoginService.user;

  ngOnInit() {
    console.log(this.user);
  }
}
