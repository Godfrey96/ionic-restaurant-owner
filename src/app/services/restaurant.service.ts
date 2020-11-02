import { Injectable } from '@angular/core';
import { resolveCname } from 'dns';

import firebase from 'firebase/app'
import 'firebase/auth'
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  database: any;
  rootRef: any;
  autoId: any;

  constructor() { }

  // Add restaurant
  registerRestaurant(resName, phone, email, website, address) {
    firebase.database().ref('restaurants').set({
      resName: resName,
      phone: phone,
      email: email,
      website: website,
      address: address
    }).then((res) => {
      console.log(res)
    })
  }
}