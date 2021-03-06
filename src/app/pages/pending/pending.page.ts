import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import firebase from 'firebase/app';
import 'firebase/firestore'

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {

  restaurants: Array<any> = [];
  pendingBooking: Array<any> = [];
  restId: any;
  pendingSize: any;

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.authService.signAuth();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        // let user = firebase.auth().currentUser.uid
        // console.log('user: ', user)

        //fetching all restaurants
        firebase.firestore().collection('restaurants').onSnapshot(res => {
          res.forEach(element => {
            this.restaurants.push(Object.assign(element.data(), { uid: element.id }));
            this.restId = { uid: element.id }.uid;

            firebase.firestore().collection('restaurants').doc(this.restId).collection('bookings').where('restId', '==', this.restId).orderBy('createdAt', 'desc').where('resManagerId', '==', user.uid).where('status', '==', 'Pending').onSnapshot(res => {
              res.forEach(doc => {
                this.pendingBooking.push(Object.assign(doc.data(), { uid: doc.id }))
                this.pendingSize = (this.pendingBooking).length
                console.log('Pending size: ', this.pendingSize)
              })
            })

          });
        });

      }
    })


  }


  //Booking status
  status(restId, bookId, status) {
    this.restaurantService.bookingStatus(restId, bookId, status);
    // this.disableButton = true;
  }

  ago(time) {
    let difference = moment(time).diff(moment())
    return moment.duration(difference).humanize();
  }

}
