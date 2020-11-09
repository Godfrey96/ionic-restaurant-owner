import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // ownerId: any;
  // restaurants: Array<any>;
  restaurants: any;
  show = false;
  content = 'addRest';
  // array: any;
  x: any;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private nav: NavController
  ) { }

  ngOnInit() { 
    this.authService.signAuth();

    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)

    firebase.firestore().collection('restaurants').doc(user).get().then(snapshot => {
      this.restaurants = snapshot.data();
      //console.log('new data: ', this.restaurants)
      if(user === 'ownerId'){
        this.show = this.restaurants
      }
    })
  }

  editRestaurant(){

  }
  
  newRestaurant(){
    this.nav.navigateRoot('/add-restaurant')
  }
}
