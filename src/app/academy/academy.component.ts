import { Component, OnInit } from "@angular/core";
import { Academy } from "../shared/models/academy.model";
import { Piano } from "../shared/models/piano.model";
import { Log } from "../shared/models/log.model";
import { TechnicianService } from "../shared/services/technician.service";
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

  constructor(
    public TechnicianService: TechnicianService,
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
      34,
      null,
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

  ngOnInit() {
    this.getCurrentAcademy();
    this.getCurrentAcademyPianos();
    // LOG RESULTS
    console.log("Current Academy", this.currentAcademy);
    console.log("Current Pianos", this.currentAcademyPianos$);
  }
}
