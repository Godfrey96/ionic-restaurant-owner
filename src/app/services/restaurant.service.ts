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

  bookingStatus(ownerId, userId, value){
    var db = firebase.firestore();
    var restaurantRef = db.collection('restaurants').doc(ownerId);

    var restaurant = Promise.all([
      restaurantRef.collection('bookings').doc(userId).set({
        status: value
        // userId: userId
      }, { merge: true }).then(a => {
        console.log('Changed')
      })
    ])
  }
}