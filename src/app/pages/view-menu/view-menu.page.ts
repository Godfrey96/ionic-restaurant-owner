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

  restaurants: any;
  restaurantLists: Array<any> = [];
  restId: any;

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

    //fetching all restaurants
    firebase.firestore().collection('restaurants').onSnapshot(res => {
      res.forEach(element => {
        this.restaurantLists.push(Object.assign(element.data(), { uid:element.id }));
        this.restId = { uid: element.id }.uid
        console.log('rest id: ', this.restId)

        console.log('REST IDD: ', this.restId)
        console.log('MENUD_ID: ', this.id)
        firebase.firestore().collection('restaurants').doc(this.restId).collection('menu').doc(this.id).get().then(snapshot => {
          this.menu = snapshot.data();
        });

      });
    });

    // fetching all menus
    // firebase.firestore().collection('restaurants').doc(user).collection('menu').where('ownerId', '==' , user).onSnapshot(res => {
    //   res.forEach(element => {
    //     this.menus.push(Object.assign( element.data(), {uid:element.id}) );
    //     this.menuId = {uid:element.id}
    //     console.log('MenudId: ', this.menuId)
    //   });
    // });
    // firebase.firestore().collection('restaurants').where('ownerId', '==', user).get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     this.menus.push(Object.assign( doc.data(), {uid:doc.id}) );
    //     this.menuId = {uid:doc.id}.uid
    //     doc.ref.collection('menu').doc(this.menuId).get().then((querySnapshot) => {
    //       this.menu = querySnapshot
    //       console.log('this menu: ', this.menu)
    //     })
    //   })
    // })

    // fetching single menu
    // .where('ownerId', '==', this.id)
    // firebase.firestore().collection('restaurants').doc(this.id).collection('menu').where('ownerId', '==', this.id).get().then(snapshot => {
    //   this.menu = snapshot;
    //   console.log('new data: ', this.menu)
    // });
  }

}
