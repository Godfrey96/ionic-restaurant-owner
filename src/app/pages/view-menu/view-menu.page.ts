import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.page.html',
  styleUrls: ['./view-menu.page.scss'],
})
export class ViewMenuPage implements OnInit {

  id: any;
  menu: any;

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

    // fetching single menu
    firebase.firestore().collection('restaurants').doc(this.id).collection('menu').where('ownerId', '==', this.id).get().then(snapshot => {
      this.menu = snapshot;
      console.log('new data: ', this.menu)
    });
  }

}
