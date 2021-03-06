import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import firebase from 'firebase/app';
import 'firebase/firestore'

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.page.html',
  styleUrls: ['./cancelled.page.scss'],
})
export class CancelledPage implements OnInit {

  restaurants: Array<any> = [];
  cancelledBooking: Array<any> = [];
  restId: any;
  cancelledSize: any;

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

            firebase.firestore().collection('restaurants').doc(this.restId).collection('bookings').where('restId', '==', this.restId).orderBy('createdAt', 'desc').where('resManagerId', '==', user.uid).where('status', '==', 'Cancelled').onSnapshot(res => {
              res.forEach(doc => {
                this.cancelledBooking.push(Object.assign(doc.data(), { uid: doc.id }))
                this.cancelledSize = (this.cancelledBooking).length
                console.log('Cancelled size: ', this.cancelledSize)
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
