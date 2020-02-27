import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoginService } from "../shared/services/login.service";
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
  constructor(public LoginService: LoginService, public router: Router) {}

  async login(userName: any, userPassword: any) {
    console.log(userName, userPassword);
    /* try {
      this.LoginService.login(userName, userPassword).subscribe(user => {
        this.currentUser = user;
        console.log(this.currentUser);
        this.router.navigate([`/${this.currentUser.user_role}`]);
      });
    } catch (err) {
      if (err) {
        alert("Something went wrong. Call support.");
        throw err;
      }
    } */

    this.LoginService.login(userName, userPassword).subscribe({
      next(response) {
        this.currentUser = response;
        console.log(this.currentUser.user_role);
      },
      error(err) {
        console.log("Error:", err);
        this.loginError = err;
      },
      complete() {
        console.log("Request completed.");
        this.router.navigate([`/${this.currentUser.user_role}`]);
      }
    });
  }

  ngOnInit() {}
}
