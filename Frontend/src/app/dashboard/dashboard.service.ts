import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private db: AngularFirestore) {
  }

  getUserRequests() {
    return this.db.collection('user').snapshotChanges();
  }

  getCrimes(id) {
    return this.db.collection('user').doc(id).collection('crimes').snapshotChanges();
  }

  confirmUser(id) {
    return this.db.collection('user').doc(id).set({accVerify: true}, {merge: true})
  }

  cancelUser(id){
    return this.db.collection('user').doc(id).delete();
  }

  verifyMessage(message){
    return this.db.collection('user').doc(message.userId).collection('crimes').doc(message.id).set({msgVerify: message.msgVerify}, {merge: true})
  }
}
