import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {Admin} from "../model/Admin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  admin = new Admin();

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.admin)
  }

  anError() {
    return localStorage.getItem('token') != null ? localStorage.getItem('token') === 'err' ? true : false : false
  }
}
