import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoginService } from "../shared/services/login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginInput = new FormControl("");
  currentUser;
  loginError;
  logged_in = document.cookie;

  constructor(public LoginService: LoginService, private router: Router) {}

  async login(userName: any, userPassword: any) {
    console.log(userName, userPassword);

    try {
      this.LoginService.login(userName, userPassword).subscribe((user) => {
        this.currentUser = user;
        this.router.navigate([`/${this.currentUser.user_role}/academies`]);
      });
    } catch (err) {
      if (err) {
        alert("Something went wrong. Call support.");
        throw err;
      }
    }
  }

  logout() {}

  ngOnInit() {}
}
