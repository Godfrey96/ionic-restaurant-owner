import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/firestore'

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menu: Array<any> = [];
  restaurantLists: Array<any> = [];
  restId: any;

  constructor(
    private nav: NavController,
    private authService: AuthService
  ) {
    // this.authService.getSession();
  }

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

        // Fetching Menu by id
        firebase.firestore().collection('restaurants').doc(this.restId).collection('menu').onSnapshot(data => {
          data.forEach(doc => {
            this.menu.push(doc.data());
          })
        })

        // firebase.firestore().collection('restaurants').doc(this.restId).get().then(snapshot => {
        //   this.restaurants = snapshot.data();
        //   //console.log('new data: ', this.restaurants)
        //   if (user === 'ownerId') {
        //     this.show = this.restaurants
        //   }
        // })

      });
    });

    // fetching all menus
    // firebase.firestore().collection('restaurants').doc(user).collection('menu').where('ownerId', '==' , user).onSnapshot(res => {
    //   res.forEach(element => {
    //     this.menu.push(element.data());
    //   });
    // });

  }

  addmuenu() {
    this.nav.navigateRoot('/add-menu')
  }

}
