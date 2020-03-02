import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/shared/services/login/login.service";

@Component({
  selector: "app-disp-logs",
  templateUrl: "./disp-logs.component.html",
  styleUrls: ["./disp-logs.component.scss"]
})
export class DispLogsComponent implements OnInit {
  user = this.LoginService.user;
  constructor(public LoginService: LoginService) {}

  ngOnInit() {}
}
