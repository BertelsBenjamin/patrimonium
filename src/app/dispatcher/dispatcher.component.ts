import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/services/login.service";

@Component({
  selector: "app-dispatcher",
  templateUrl: "./dispatcher.component.html",
  styleUrls: ["./dispatcher.component.scss"]
})
export class DispatcherComponent implements OnInit {
  constructor(public Loginservice: LoginService) {}
  user = this.Loginservice.user;
  ngOnInit() {
    console.log(this.user);
  }
}
