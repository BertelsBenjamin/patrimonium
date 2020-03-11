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
  constructor(
    public LoginService: LoginService,
    public UsersService: UsersService,
    public AcademiesService: AcademiesService
  ) {}

  // VARIABLES
  /* USERS */
  user = this.LoginService.user;
  users$: Observable<any>;
  users = [];
  technicians = [];

  /* ROLES */
  new_tech_role: any;
  roles$: Observable<any>;
  roles = [];
  roleValues = [];

  /* DEPARTMENTS */
  new_tech_department: any;
  departments$: Observable<any>;
  departments = [];
  departmentValues = [];

  /* PROVINCES */
  new_tech_province: any;
  provinces$: Observable<any>;
  provinces = [];
  provinceValues = [];

  // DECORATORS
  @ViewChild("role", { static: true }) instance_role: NgbTypeahead;
  focus_role$ = new Subject<string>();
  click_role$ = new Subject<string>();

  search_role = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click_role$.pipe(
      filter(() => !this.instance_role.isPopupOpen())
    );
    const inputFocus$ = this.focus_role$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ""
          ? this.roles
          : this.roles.filter(v => {
              v.toLowerCase().indexOf(term.toLowerCase()) > -1;
            })
        ).slice(0, 10)
      )
    );
  };

  @ViewChild("department", { static: true }) instance_department: NgbTypeahead;
  focus_department$ = new Subject<string>();
  click_department$ = new Subject<string>();

  search_department = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click_department$.pipe(
      filter(() => !this.instance_department.isPopupOpen())
    );
    const inputFocus$ = this.focus_department$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ""
          ? this.departments
          : this.departments.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

  @ViewChild("province", { static: true }) instance_province: NgbTypeahead;
  focus_province$ = new Subject<string>();
  click_province$ = new Subject<string>();

  search_province = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click_province$.pipe(
      filter(() => !this.instance_province.isPopupOpen())
    );
    const inputFocus$ = this.focus_province$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ""
          ? this.provinces
          : this.provinces.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

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
      result.forEach(e => {
        this.roles.push(e.role_role);
      }),
        console.log("DISP_TECH_roles:", this.roles);
    });
  }

  getDepartments() {
    this.departments$ = this.UsersService.getDepartments();
    this.departments$.subscribe(result => {
      result.forEach(e => {
        this.departments.push(e.department_name);
      }),
        console.log("DISP_TECH_departments:", this.departments);
    });
  }

  getProvinces() {
    this.provinces$ = this.UsersService.getProvinces();
    this.provinces$.subscribe(result => {
      result.forEach(e => {
        this.provinces.push(e.province_name);
      }),
        console.log("DISP_TECH_provinces:", this.provinces);
    });
  }

  ngOnInit() {
    this.getUsersAndTechnicians();
    this.getRoles();
    this.getDepartments();
    this.getProvinces();
  }
}
