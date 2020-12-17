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

  restaurants: any;
  restaurantLists: Array<any> = [];
  show = false;

  x: any;
  restId: any;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.authService.signAuth();

    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)

    //fetching all restaurants
    firebase.firestore().collection('restaurants').onSnapshot(res => {
      res.forEach(element => {
        this.restaurantLists.push(Object.assign(element.data(), { uid: element.id }));
        this.restId = { uid: element.id }.uid
        console.log('rest id: ', this.restId)

        // Fetching Restaurant by id
        firebase.firestore().collection('restaurants').doc(this.restId).get().then(snapshot => {
          this.restaurants = snapshot.data();
          //console.log('new data: ', this.restaurants)
          if (user === 'ownerId') {
            this.show = this.restaurants
          }
        })

      });
    });
    
  }

  editRestaurant() { }

  newRestaurant() {
    this.nav.navigateRoot('/add-restaurant')
  }
}
