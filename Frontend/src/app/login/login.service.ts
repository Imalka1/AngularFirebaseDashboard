import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  login(admin) {
    this.afAuth.signInWithEmailAndPassword(admin.email, admin.password)
      .then(value => {
        localStorage.setItem('token', 'logged')
        admin.loginSuccess = false
      })
      .catch(err => {
        admin.loginSuccess = false
      });
  }

  logout() {
    this.afAuth.signOut()
      .then((res) => localStorage.clear());
  }

  signup(admin) {
    this.afAuth.createUserWithEmailAndPassword(admin.email, admin.password)
      .then(value => {
        admin.signUpSuucess = 1
      })
      .catch(error => {
        admin.signUpSuucess = 2
      });
  }
}
