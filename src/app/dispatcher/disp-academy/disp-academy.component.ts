import { Component, OnInit } from "@angular/core";
import { Academy } from "../../shared/models/academy.model";
import { Piano } from "../../shared/models/piano.model";
import { Log } from "../../shared/models/log.model";
import { AcademiesService } from "../../shared/services/academies/academies.service";
import { LoginService } from "../../shared/services/login/login.service";
import { LogsService } from "../../shared/services/logs/logs.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { PianosService } from "src/app/shared/services/pianos/pianos.service";

@Component({
  selector: "app-disp-academy",
  templateUrl: "./disp-academy.component.html",
  styleUrls: ["./disp-academy.component.scss"]
})
export class DispAcademyComponent implements OnInit {
  // VARIABLES
  currentAcademy$: Observable<Academy>;
  currentAcademy: Academy;
  currentAcademyPianos$: Observable<Piano[]>;
  currentAcademyPianos: Piano[];
  pianoLogs$: Observable<Log[]>;
  pianoLogs: Log[];
  academies$: Observable<Academy[]>;
  academies: any;
  public model: any;

  constructor(
    public AcademiesService: AcademiesService,
    public PianosService: PianosService,
    public LogsService: LogsService,
    public LoginService: LoginService,
    private route: ActivatedRoute
  ) {}

  getAllAcademies() {
    this.academies$ = this.AcademiesService.getAllAcademies();
    this.academies$.subscribe(result => (this.academies = result));

    search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term =>
          term.length < 2
            ? []
            : this.academies
                .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
                .slice(0, 10)
        )
      );
  }

  getCurrentAcademy() {
    this.currentAcademy$ = this.AcademiesService.findAcademy(
      this.route.snapshot.params.id
    );
    this.currentAcademy$.subscribe(result => (this.currentAcademy = result));
  }

  getCurrentAcademyPianos() {
    this.currentAcademyPianos$ = this.PianosService.findPianosByAcademy(
      this.route.snapshot.params.id
    );
    this.currentAcademyPianos$.subscribe(
      result => (this.currentAcademyPianos = result)
    );
  }

  getInterventions(piano_id) {
    this.pianoLogs$ = this.LogsService.getLogs(piano_id);
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
    this.LogsService.postLog(log).subscribe((postedLog: Log) => {
      console.log("POSTED LOG:", postedLog);
    });
    this.getInterventions(piano_id);
  }

  updateRoom(pianoID: number, oldRoom: string, newRoom: string) {
    this.PianosService.updateRoom(pianoID, oldRoom, newRoom).subscribe(
      (postedRoom: string) => {
        console.log(postedRoom);
        console.log("UPDATE ROOM:", { pianoID, oldRoom, newRoom });
      }
    );
    this.getCurrentAcademyPianos();
  }

  addPiano() {}

  deletePiano(pianoID: number) {
    this.PianosService.deletePiano(pianoID).subscribe((response: string) => {
      console.log(response);
    });
    this.getCurrentAcademyPianos();
  }

  ngOnInit() {
    this.getAllAcademies();
    this.getCurrentAcademy();
    this.getCurrentAcademyPianos();
    // LOG RESULTS
    console.log("Current Academy", this.currentAcademy);
    console.log("Current Pianos", this.currentAcademyPianos$);
  }
}
