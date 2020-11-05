import { Injectable } from '@angular/core';

import { Restaurant } from '../model/restaurant';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  database: any;
  rootRef: any;
  autoId: any;

  constructor() { }

  // Add restaurant
  registerRestaurant() {
    return firebase.firestore().collection('restaurants');
  }

  getAllBookings(){
    return firebase.firestore().collection('restaurants');
  }

  // Add menu
  // add_menu(){
  //   return firebase.firestore().collection('menu');
  // }
}