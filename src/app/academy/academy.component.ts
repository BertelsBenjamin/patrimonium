import { Component, OnInit } from "@angular/core";
import { Academy } from "../shared/models/academy.model";
import { Piano } from "../shared/models/piano.model";
import { Log } from "../shared/models/log.model";
import { TechnicianService } from "../shared/services/technician.service";
import { LoginService } from "../shared/services/login.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder
} from "@angular/forms";
import { ValueTransformer } from "@angular/compiler/src/util";
import { getLocaleDateFormat } from "@angular/common";

@Component({
  selector: "app-academy",
  templateUrl: "./academy.component.html",
  styleUrls: ["./academy.component.scss"]
})
export class AcademyComponent implements OnInit {
  // VARIABLES
  currentAcademy$: Observable<Academy>;
  currentAcademy: Academy;
  currentAcademyPianos$: Observable<Piano[]>;
  currentAcademyPianos: Piano[];
  pianoLogs$: Observable<Log[]>;
  pianoLogs: Log[];

  constructor(
    public TechnicianService: TechnicianService,
    public LoginService: LoginService,
    private route: ActivatedRoute,
    private interventionForm: FormBuilder,
    private piano_editForm: FormBuilder
  ) {}

  getCurrentAcademy() {
    this.currentAcademy$ = this.TechnicianService.findAcademy(
      this.route.snapshot.params.id
    );
    this.currentAcademy$.subscribe(result => (this.currentAcademy = result));
  }

  getCurrentAcademyPianos() {
    this.currentAcademyPianos$ = this.TechnicianService.findPianosByAcademy(
      this.route.snapshot.params.id
    );
    this.currentAcademyPianos$.subscribe(
      result => (this.currentAcademyPianos = result)
    );
  }

  getInterventions(piano_id) {
    this.pianoLogs$ = this.TechnicianService.getLogs(piano_id);
    this.pianoLogs$.subscribe(result => (this.pianoLogs = result));
  }

  postIntervention(
    tuning: boolean,
    regulation: boolean,
    intonation: boolean,
    comment: string,
    piano_id: number
  ) {
    let log = new Log(
      null,
      new Date().toJSON().slice(0, 10),
      this.LoginService.user.user_id,
      this.LoginService.user.user_username,
      comment,
      piano_id,
      null,
      tuning,
      regulation,
      intonation
    );
    console.log(log);
    this.TechnicianService.postLog(log).subscribe((postedLog: Log) => {
      console.log(postedLog);
    });
  }

  updateRoom(pianoID: number, oldRoom: string, newRoom: string) {
    this.TechnicianService.updateRoom(pianoID, oldRoom, newRoom).subscribe(
      (postedRoom: string) => {
        console.log(pianoID, oldRoom, newRoom);
      }
    );
    this.getCurrentAcademyPianos();
  }

  ngOnInit() {
    this.getCurrentAcademy();
    this.getCurrentAcademyPianos();
    // LOG RESULTS
    console.log("Current Academy", this.currentAcademy);
    console.log("Current Pianos", this.currentAcademyPianos$);
  }
}
