// MODULES
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RoutingModule } from "./routing/routing.module";
import { Routes, RouterModule } from "@angular/router";

// COMPONENTS
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeFooterComponent } from "./home-footer/home-footer.component";
import { PricingComponent } from "./pricing/pricing.component";
import { ContactComponent } from "./contact/contact.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "pricing", component: PricingComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent }
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
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
