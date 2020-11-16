import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { element } from 'protractor';

@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.page.html',
  styleUrls: ['./view-menu.page.scss'],
})
export class ViewMenuPage implements OnInit {

  id: any;
  menuId: any;
  menu: any;
  menus: Array<any> = [];

  constructor(
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {

    // this.authService.signAuth();
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)

    // fetching all menus
    firebase.firestore().collection('restaurants').doc(user).collection('menu').where('ownerId', '==' , user).onSnapshot(res => {
      res.forEach(element => {
        this.menus.push(Object.assign( element.data(), {uid:element.id}) );
        this.menuId = {uid:element.id}
        console.log('MenudId: ', this.menuId)
      });
    });

    // fetching single menu
    // .where('ownerId', '==', this.id)
    firebase.firestore().collection('restaurants').doc(this.id).collection('menu').where('ownerId', '==', this.id).get().then(snapshot => {
      this.menu = snapshot;
      console.log('new data: ', this.menu)
    });
  }

}
