import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavbarComponent} from "./navbar/navbar.component";


const routes: Routes = [
  {
    path:'dashboard',
    component:NavbarComponent
  },
  {path: '', pathMatch: "full", redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
