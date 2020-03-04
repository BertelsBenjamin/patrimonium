import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/shared/services/login/login.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { User } from "../../shared/models/user.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-disp-technicians",
  templateUrl: "./disp-technicians.component.html",
  styleUrls: ["./disp-technicians.component.scss"]
})
export class DispTechniciansComponent implements OnInit {
  user = this.LoginService.user;
  users$: Observable<any>;
  users = [];
  technicians = [];

  // FUNCTIONS
  getUsersAndTechnicians() {
    this.users$ = this.UsersService.getUsers();
    this.users$.subscribe(
      result => (
        (this.users = result),
        result.forEach(e => {
          if (e.user_user_function == "Technician") {
            this.technicians.push(e);
          }
        }),
        console.log("DISP_TECH_users:", this.users),
        console.log("DISP_TECH_technicians:", this.technicians)
      )
    );
  }

  filterTechnicians() {
    console.log("This function doesn't work yet.");
  }

  addNewTechnician() {
    console.log("This function doesn't work yet.");
  }
  constructor(
    public LoginService: LoginService,
    public UsersService: UsersService
  ) {}

  ngOnInit() {
    this.getUsersAndTechnicians();
  }
}
