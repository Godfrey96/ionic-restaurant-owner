import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.page.html',
  styleUrls: ['./dash-profile.page.scss'],
})
export class DashProfilePage implements OnInit {
  restManagers: firebase.firestore.DocumentData;

  constructor(
              private authService: AuthService,
              private nav: NavController
            ) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      if(user){

        firebase.firestore().collection('restaurantManagers').doc(user.uid).get().then(snap => {
          this.restManagers = snap.data()
          console.log('rest - managers: ', this.restManagers)
        })

      }else{

      }
    })

  }

  logout(){
    this.authService.logoutOwner();
    this.authService.signAuth();
    this.nav.navigateRoot('/signin')
  }

}
