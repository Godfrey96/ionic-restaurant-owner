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

    // fetching all menus
    firebase.firestore().collection('restaurants').doc(user).collection('menu').where('ownerId', '==' , user).onSnapshot(res => {
      res.forEach(element => {
        this.menu.push(element.data());
      });
    });

  }

  addmuenu() {
    this.nav.navigateRoot('/add-menu')
  }

}
