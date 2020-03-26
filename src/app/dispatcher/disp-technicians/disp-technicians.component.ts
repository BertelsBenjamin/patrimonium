import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../../shared/models/user.model";
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
import { FormsModule } from "@angular/forms";

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
  /* FORMS */
  // ADD TECHNICIAN FORM
  addTechnicianForm = new FormsModule();
  /* USERS */
  user = this.LoginService.user;
  users$: Observable<any>;
  users = [];
  technicians = [];
  newUser: any;

  /* ROLES */
  new_tech_role: any;
  roles$: Observable<any>;
  roles;
  rolesArray = [];
  roleIDsd = [];

  /* DEPARTMENTS */
  new_tech_department: any;
  departments$: Observable<any>;
  departments;
  departmentsArray = [];
  departmentValues = [];

  /* PROVINCES */
  new_tech_province: any;
  provinces$: Observable<any>;
  provinces;
  provincesArray = [];
  provinceValues = [];

  /* LEVELS */
  new_tech_level: any;
  levels$: Observable<any>;
  levels;
  levelsArray = [];
  levelValues = [];

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
          ? this.rolesArray
          : this.rolesArray.filter(v => {
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
          ? this.departmentsArray
          : this.departmentsArray.filter(
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
          ? this.provincesArray
          : this.provincesArray.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

  @ViewChild("level", { static: true }) instance_level: NgbTypeahead;
  focus_level$ = new Subject<string>();
  click_level$ = new Subject<string>();

  search_level = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click_level$.pipe(
      filter(() => !this.instance_level.isPopupOpen())
    );
    const inputFocus$ = this.focus_level$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ""
          ? this.levelsArray
          : this.levelsArray.filter(
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

  addNewTechnician(form) {
    this.newUser = {
      username: `${form.controls.first_name.value} ${form.controls.last_name.value}`,
      country_code: `${form.controls.country.value}`,
      first_name: `${form.controls.first_name.value}`,
      last_name: `${form.controls.last_name.value}`,
      department_id: "",
      level_id: "",
      email: `${form.controls.email.value}`,
      mobile: `${form.controls.phone.value}`,
      province_id: ``,
      birth_day: `${form.controls.birthday.value}`,
      password: "test",
      role_id: ""
    };
    console.log("This function doesn't work yet.");
    console.log(this.new_tech_role);
    console.log("Form:", form);

    //CHECK FOR MATCHING ROLE
    this.roles.forEach(role => {
      form._directives.forEach(directive => {
        if (role.role_role == directive.value) {
          console.log(role.role_role, directive.value, role.role_id);
          this.newUser.role_id = role.role_id;
        }
      });
    });

    //CHECK FOR MATCHING DEPARTMENT
    this.departments.forEach(department => {
      form._directives.forEach(directive => {
        if (department.department_name == directive.value) {
          console.log(
            department.department_name,
            directive.value,
            department.department_id
          );
          this.newUser.department_id = department.department_id;
        }
      });
    });

    //CHECK FOR MATCHING PROVINCE
    this.provinces.forEach(province => {
      form._directives.forEach(directive => {
        if (province.province_name == directive.value) {
          console.log(
            province.province_name,
            directive.value,
            province.province_name
          );
          this.newUser.province_id = province.province_id;
        }
      });
    });
    console.log(this.newUser);

    //CHECK FOR MATCHING LEVELS
    this.levels.forEach(level => {
      form._directives.forEach(directive => {
        if (level.level_description == directive.value) {
          console.log(
            level.level_description,
            directive.value,
            level.level_description
          );
          this.newUser.level_id = level.level_description;
        }
      });
    });
    console.log(this.newUser);
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
      this.roles = result;
      console.log("Roles:", result);
      result.forEach(role => {
        this.rolesArray.push(role.role_role);
        for (let key in role) {
        }
      }),
        console.log("DISP_TECH_roles:", this.roles);
    });
  }

  getDepartments() {
    this.departments$ = this.UsersService.getDepartments();
    this.departments$.subscribe(result => {
      this.departments = result;
      this.departments.forEach(department => {
        this.departmentsArray.push(department.department_name);
      }),
        console.log("DISP_TECH_departments:", this.departments);
    });
  }

  getProvinces() {
    this.provinces$ = this.UsersService.getProvinces();
    this.provinces$.subscribe(result => {
      this.provinces = result;
      this.provinces.forEach(province => {
        this.provincesArray.push(province.province_name);
      }),
        console.log("DISP_TECH_provinces:", this.provinces);
    });
  }

  getLevels() {
    this.levels$ = this.UsersService.getLevels();
    this.levels$.subscribe(result => {
      this.levels = result;
      this.levels.forEach(level => {
        this.levelsArray.push(level.level_description);
      }),
        console.log("DISP_TECH_levels:", this.levels);
    });
  }

  ngOnInit() {
    this.getUsersAndTechnicians();
    this.getRoles();
    this.getDepartments();
    this.getProvinces();
    this.getLevels();
  }
}
