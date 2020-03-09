import { Component, OnInit, ViewChild } from "@angular/core";
import { LoginService } from "src/app/shared/services/login/login.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { AcademiesService } from "src/app/shared/services/academies/academies.service";
import { Observable, Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map
} from "rxjs/operators";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

@Component({
  selector: "app-disp-technicians",
  templateUrl: "./disp-technicians.component.html",
  styleUrls: ["./disp-technicians.component.scss"]
})
export class DispTechniciansComponent implements OnInit {
  model: any;
  user = this.LoginService.user;
  users$: Observable<any>;
  users = [];
  technicians = [];
  roles$: Observable<any>;
  roles = [];

  @ViewChild("instance", { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ""
          ? this.roles
          : this.roles.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

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
        result => (
          (this.users = result),
          (this.technicians = []),
          result.forEach(e => {
            if (e.user_user_function == "Technician") {
              this.technicians.push(e);
            }
          }),
          console.log("DISP_TECH_users(filtered):", this.users),
          console.log("DISP_TECH_technicians(filtered):", this.technicians)
        )
      );
    }
  }

  addNewTechnician() {
    console.log("This function doesn't work yet.");
  }

  deleteTechnician(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.UsersService.deleteTechnician(id).subscribe(response => {
          console.log(response);
        });
        Swal.fire("Deleted!", "Technician has been deleted.", "success");
        this.getUsersAndTechnicians();
      }
    });
  }

  getRoles() {
    this.roles$ = this.UsersService.getRoles();
    this.roles$.subscribe(result => {
      (this.roles = result), console.log("DISP_TECH_roles:", this.roles);
    });
  }

  ngOnInit() {
    this.getUsersAndTechnicians();
    this.getRoles();
  }
}
