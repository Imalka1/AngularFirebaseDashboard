import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth,private router: Router) { }

  login(admin) {
    this.afAuth.signInWithEmailAndPassword(admin.email, admin.password)
      .then(value => {
        localStorage.setItem('token','logged')
      })
      .catch(err => {
        localStorage.setItem('token','err')
        console.log('Something went wrong: ', err.message);
      });
  }
}
