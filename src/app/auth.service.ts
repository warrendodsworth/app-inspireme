import 'firebase/auth';
import 'firebase/firestore';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user';


@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {

    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        return of(null)
      }
    }))
  }

  loginFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider)
  }
  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider)
  }
  logout() {
    return this.afAuth.auth.signOut()
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      console.log(credential)
      this.updateUserData(credential.user)
    })
  }
  updateUserData(user: firebase.User): any {
    const userRef = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      roles: {
        subscriber: true
      }
    };

    return userRef.set(data, { merge: true });
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }
  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }
  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }
  private checkAuthorization(user: User, allowedroles: string[]): boolean {
    if (!user) return false;

    for (const role of allowedroles) {
      if (user.roles[role]) {
        return true;
      }
    }

    return false;
  }
}

//https://www.youtube.com/watch?v=1PEdd2rtG30
