import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/models/user.model";
import * as firebase from "firebase/app";

@Component({
  selector: "app-home-header",
  templateUrl: "./home-header.component.html",
  styleUrls: ["./home-header.component.scss"]
})
export class HomeHeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    console.log(firebase.auth().currentUser);
  }
}
