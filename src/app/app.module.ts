// MODULES
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
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
import { AcademyComponent } from "./academy/academy.component";
import { DispatcherComponent } from "./dispatcher/dispatcher.component";
import { ManagerComponent } from "./manager/manager.component";

// SERVICES
import { TechnicianService } from "./shared/services/technician.service";
import { LoginService } from "./shared/services/login.service";

// MODELS
import { Academy } from "./shared/models/academy.model";

// VARIA
import { config } from "rxjs";
import { environment } from "src/environments/environment";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "pricing", component: PricingComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "technician", component: TechnicianComponent },
  { path: "dispatcher", component: DispatcherComponent },
  { path: "manager", component: ManagerComponent },
  {
    path: "technician/academy/:id",
    component: AcademyComponent
  }
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
    AcademyComponent,
    DispatcherComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [TechnicianService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
