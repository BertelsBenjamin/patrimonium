import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoginService } from "../shared/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginInput = new FormControl("");
  constructor(public LoginService: LoginService) {}

  login(userName: any, userPassword: any) {
    console.log(userName, userPassword);
    return this.LoginService.login(userName, userPassword);
  }

  ngOnInit() {}
}
