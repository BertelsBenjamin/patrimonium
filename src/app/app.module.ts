// MODULES
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { RoutingModule } from "./routing/routing.module";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

// COMPONENTS
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeFooterComponent } from "./home-footer/home-footer.component";
import { PricingComponent } from "./pricing/pricing.component";
import { ContactComponent } from "./contact/contact.component";
import { TechnicianComponent } from "./technician/technician.component";
import { TechAcademyComponent } from "./technician/tech_academy/tech_academy.component";
import { DispatcherComponent } from "./dispatcher/dispatcher.component";
import { DispAcademyComponent } from "./dispatcher/disp-academy/disp-academy.component";
import { ManagerComponent } from "./manager/manager.component";

// SERVICES
import { AcademiesService } from "./shared/services/academies/academies.service";
import { LoginService } from "./shared/services/login/login.service";
import { DispTechniciansComponent } from "./dispatcher/disp-technicians/disp-technicians.component";
import { DispLogsComponent } from "./dispatcher/disp-logs/disp-logs.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "pricing", component: PricingComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "technician/academies", component: TechnicianComponent },
  {
    path: "technician/academies/academy/:id",
    component: TechAcademyComponent
  },
  { path: "dispatcher/academies", component: DispatcherComponent },
  { path: "dispatcher/academies/academy/:id", component: DispAcademyComponent },
  { path: "dispatcher/technicians", component: DispTechniciansComponent },
  { path: "dispatcher/logs", component: DispLogsComponent },
  { path: "manager", component: ManagerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    HomeComponent,
    PricingComponent,
    ContactComponent,
    TechnicianComponent,
    TechAcademyComponent,
    DispatcherComponent,
    DispAcademyComponent,
    ManagerComponent,
    DispTechniciansComponent,
    DispLogsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AcademiesService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
