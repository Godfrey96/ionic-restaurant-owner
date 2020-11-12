import { RestaurantService } from 'src/app/services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore'

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.page.html',
  styleUrls: ['./view-bookings.page.scss'],
})
export class ViewBookingsPage implements OnInit {

  booking: Array<any> = [];

  constructor(
              private authService: AuthService,
              private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.authService.signAuth();

    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)

    this.restaurantService.getAllBookings().doc(user).collection('bookings').where('ownerId', '==', user).orderBy('date', 'desc').onSnapshot(res => {
      res.forEach(element => {
        this.booking.push(Object.assign( element.data(), {uid:element.id}) );
        console.log('uuu: ' + {uid:element.id})
        console.log('u: ' + element.id)
      })
    })
  }

  //Booking status
  status(ownerId, userId, status){
    this.restaurantService.bookingStatus(ownerId, userId, status);
  }

}
