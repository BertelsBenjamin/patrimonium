import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/shared/services/login/login.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { AcademiesService } from "src/app/shared/services/academies/academies.service";
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

  constructor(
    public LoginService: LoginService,
    public UsersService: UsersService,
    public AcademiesService: AcademiesService
  ) {}

  // FUNCTIONS
  getUsersAndTechnicians() {
    this.users$ = this.UsersService.getUsers();
    this.users$.subscribe(
      result => (
        (this.users = result),
        (this.technicians = []),
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

  filterTechniciansOnDispInput(input) {
    console.log("This function doesn't work yet.");
    if (input == "") {
      this.getUsersAndTechnicians();
    } else {
      this.users$ = this.UsersService.filterTechniciansOnDispInput(input);
      this.users$.subscribe(
        result => ((this.technicians = result), console.log(this.technicians))
      );
    }
  }

  addNewTechnician() {
    console.log("This function doesn't work yet.");
  }

  ngOnInit() {
    this.getUsersAndTechnicians();
  }
}
