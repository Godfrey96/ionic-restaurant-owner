import { Injectable } from '@angular/core';

import firebase from 'firebase/app'
import 'firebase/auth'
// require('firebase/auth');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //listen for auth status changes
  signAuth(){
    return firebase.auth().onAuthStateChanged(user => {
     if(user){
       console.log('user logged in: ', user);
     }else{
       console.log('user logged out')
     }
    });
  }

  //signup owner
  signupOwner(email, password): Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  //signin owner
  signinOwner(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //reset owner password
  resetPassword(email){
    return firebase.auth().sendPasswordResetEmail(email);
  }
  //logout owner
  logoutOwner(){
    return firebase.auth().signOut();
  }

}
