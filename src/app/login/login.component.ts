import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginInput = new FormControl("");
  constructor(private authService: AuthService) {}
  ngOnInit() {}
}
