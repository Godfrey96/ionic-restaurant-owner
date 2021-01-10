import { Component, OnInit } from '@angular/core';

import firebase  from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  profile: any;

  constructor() { }

  ngOnInit() {
    let user = firebase.auth().currentUser.uid
    console.log('User: ', user)

    firebase.firestore().collection('restaurantManagers').doc(user).get().then(snapshot => {
      this.profile = snapshot.data();
      console.log('Manager Profile: ', this.profile)
    })
  }

}
