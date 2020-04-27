import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import {AngularFireDatabaseModule} from 'angularfire2/database';
// import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from "../environments/environment";
import {DatePipe} from "@angular/common";
import {NgApexchartsModule} from "ng-apexcharts";
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AngularFireAuthModule} from "@angular/fire/auth";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgApexchartsModule,
    // AngularFireDatabaseModule,
    AngularFireAuthModule,
    // AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
