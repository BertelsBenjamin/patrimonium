// MODULES
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RoutingModule } from "./routing/routing.module";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

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

// SERVICES
import { TechnicianService } from "./shared/services/technician.service";
import { Academy } from "./shared/models/academy.model";
import { config } from "rxjs";
import { environment } from "src/environments/environment";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "pricing", component: PricingComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "technician", component: TechnicianComponent },
  { path: "technician/academy", component: AcademyComponent }
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
    AcademyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [TechnicianService],
  bootstrap: [AppComponent]
})
export class AppModule {}
