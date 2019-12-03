import { Injectable } from "@angular/core";
import { Academy } from "../models/academy.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AcademyService {
  constructor(private http: HttpClient) {}
}
