import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoginService } from "../shared/services/login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginInput = new FormControl("");
  currentUser;
  loginError;
  constructor(public LoginService: LoginService, private router: Router) {}

  async login(userName: any, userPassword: any) {
    console.log(userName, userPassword);

    try {
      this.LoginService.login(userName, userPassword).subscribe(user => {
        this.currentUser = user;
        // SET COOKIES
        let keys = Object.keys(this.currentUser);
        let values = Object.values(this.currentUser);
        for (let i = 0; i < keys.length; i++) {
          document.cookie = `${keys[i]}=${values[i]}`;
        }
        console.log(this.currentUser);
        this.router.navigate([`/${this.currentUser.user_role}/academies`]);
      });
    } catch (err) {
      if (err) {
        alert("Something went wrong. Call support.");
        throw err;
      }
    }

    /* this.LoginService.login(userName, userPassword).subscribe({
      next(response) {
        this.currentUser = response;
        console.log(this.currentUser.user_role);
        this.router.navigate([`/${this.currentUser.user_role}`]);
      },
      error(err) {
        console.log("Error:", err);
        this.loginError = err;
      },
      complete() {
        console.log("Request completed.");
      }
    }); */
  }

  ngOnInit() {}
}
