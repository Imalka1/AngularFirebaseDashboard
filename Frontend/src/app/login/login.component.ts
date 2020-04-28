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
  passwordConfirmed = true;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.admin)
  }

  signUp() {
    if (this.admin.password === this.admin.confirmPassword) {
      this.loginService.signup(this.admin)
    } else {
      this.admin.signUpSuucess = 2;
    }
  }

  confirmPassword() {
    if (this.admin.password === this.admin.confirmPassword) {
      this.passwordConfirmed = true;
    } else {
      this.passwordConfirmed = false;
    }
  }
}
