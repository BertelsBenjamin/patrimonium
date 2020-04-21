import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/services/login/login.service";
import { Observable } from "rxjs";
import { AcademiesService } from "../shared/services/academies/academies.service";
import { LogsService } from "../shared/services/logs/logs.service";
import { PianosService } from "../shared/services/pianos/pianos.service";
import { Academy } from "../shared/models/academy.model";
import { Piano } from "../shared/models/piano.model";
import { Log } from "../shared/models/log.model";
import { FormControl } from "@angular/forms";
import Swal from "sweetalert2";
import pdfMake from "pdfmake/build/pdfMake";
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: "app-dispatcher",
  templateUrl: "./dispatcher.component.html",
  styleUrls: ["./dispatcher.component.scss"],
})
export class DispatcherComponent implements OnInit {
  // VARIABLES
  academies: any;
  academy$: Observable<Academy>;
  academy: any;
  pianos$: Observable<Piano[]>;
  pianos: any;
  logs$: Observable<Log[]>;
  logs: any;
  filteredAcademies: Academy[];
  technicianInput = new FormControl("");
  checkboxHQ = new FormControl("");
  HQLabelValue = "";
  user = this.Loginservice.user;
  docDefinition = new Object();

  // CONSTRUCTOR
  constructor(
    public Loginservice: LoginService,
    public AcademiesService: AcademiesService,
    public LogsService: LogsService,
    public PianosService: PianosService
  ) {}

  // FUNCTIONS
  getAllAcademies() {
    this.AcademiesService.getAllAcademies().subscribe((result) => {
      this.academies = result;
      this.academies.forEach((academy) => {
        this.findAcademy(academy.academy_id);
      });
    });
  }

  filterAcademies(hq: any, input: any) {
    hq == true ? (hq = 1) : (hq = 0);
    console.log(hq, input);
    if (hq == "0" && input == "") {
      this.AcademiesService.getAllAcademies().subscribe((result) => {
        this.academies = result;
        /* this.academies.forEach((academy) => {
          this.findAcademy(academy.academy_id);
        }); */
      });
    }
    if (hq == "0" && input !== "") {
      this.AcademiesService.filterAcademiesByInput(input).subscribe(
        (result) => {
          this.academies = result;
          /* this.academies.forEach((academy) => {
            this.findAcademy(academy.academy_id);
          }); */
        }
      );
    }
    if (hq == "1" && input == "") {
      this.AcademiesService.filterAcademiesByHQ(hq).subscribe((result) => {
        this.academies = result;
        /* this.academies.forEach((academy) => {
          this.findAcademy(academy.academy_id);
        }); */
      });
    }
    if (hq == "1" && input !== "") {
      this.AcademiesService.filterAcademiesByHQAndInput(hq, input).subscribe(
        (result) => {
          this.academies = result;
          /* this.academies.forEach((academy) => {
            this.findAcademy(academy.academy_id);
          }); */
        }
      );
    }
  }

  addAcademy() {
    console.log("This function doesn't work yet.");
  }

  deleteAcademy(id) {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.value) {
        this.AcademiesService.deleteAcademy(id).subscribe((result) => {
          console.log("Deleted!"), this.AcademiesService.getAllAcademies;
        });
        Swal.fire("Deleted!", "Academy has been deleted.", "success");
        this.getAllAcademies();
      }
    });
  }

  findAcademy(id: number) {
    this.academy$ = this.AcademiesService.findAcademy(id);
    this.academy$.subscribe((result) => {
      this.academy = result;
      this.getPianosByAcademyID(id);
    });
  }

  getPianosByAcademyID(academyID: number) {
    this.pianos$ = this.PianosService.findPianosByAcademy(academyID);
    this.pianos$.subscribe((result) => {
      this.pianos = result;
      this.pianos.forEach((piano) => {
        this.getLogsByPianoID(piano.piano_id);
      });
    });
  }

  getLogsByPianoID(pianoID: number) {
    this.logs$ = this.LogsService.getLogs(pianoID);
    this.logs$.subscribe((result) => {
      this.logs = result;
    });
  }

  async generatePDF(academyID: number) {
    let result = await this.findAcademy(academyID);
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    console.group("PDF INFO:");
    console.log(this.academy);
    console.log(this.pianos);
    console.log(this.logs);
    console.groupEnd();

    /* this.docDefinition = {
      content: [
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                "Brand",
                "Type",
                "Serial Number",
                "Room",
                "Last Intervention",
                "Technician",
              ],
              [
                `${piano.piano_brand}`,
                `${piano.piano_type}`,
                `${piano.piano_serial_number}`,
                `${piano.piano_room}`,
                `${log.log_comment}`,
                `${log.log_user_username}`,
              ],
            ],
          },
        },
      ],
    }; */

    // CREATE PDF
    pdfMake.createPdf(this.docDefinition).open();
  }

  ngOnInit() {
    //pdfMake.vfs = pdfFonts.pdfMake.vfs;
    console.log(this.user);
    this.getAllAcademies();
    //GENERATE PDF
  }
}
