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

    // const menus = [];
    // firebase.firestore().collection('menu').where('ownerId', '==' , user).get().then(snapshot => {
    //   snapshot.docs.forEach(restaurant => {
    //     let currendId = restaurant.id
    //     let appObj = { ...restaurant.data(), ['id']: currendId }
    //     menus.push(appObj)

    //     console.log('menu: ', menus)
    //   });
    // });
    firebase.firestore().collection('restaurants').doc(user).collection('menu').where('ownerId', '==' , user).onSnapshot(res => {
      res.forEach(element => {
        this.menu.push(element.data());
        // console.log(this.menu)
        // console.log(element.data().name)
        // console.log(element.id)
      });
    });

  }

  addmuenu() {
    this.nav.navigateRoot('/add-menu')
  }

}
