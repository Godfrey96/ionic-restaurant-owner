import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import firebase from 'firebase/app';
import 'firebase/firestore'

@Component({
  selector: 'app-approved',
  templateUrl: './approved.page.html',
  styleUrls: ['./approved.page.scss'],
})
export class ApprovedPage implements OnInit {

  ApprovedBooking: Array<any> = [];
  restaurants: Array<any> = [];
  restId: any;
  approvedSize: any;

  constructor(
              private authService: AuthService,
              private restaurantService: RestaurantService
            ) { }

  ngOnInit() {
    this.authService.signAuth();

    let user = firebase.auth().currentUser.uid
    console.log('user: ', user)

    //fetching all restaurants
    firebase.firestore().collection('restaurants').onSnapshot(res => {
      res.forEach(element => {
        this.restaurants.push(Object.assign(element.data(), {uid:element.id}));
        this.restId = {uid:element.id}.uid;

        firebase.firestore().collection('restaurants').doc(this.restId).collection('bookings').where('restId', '==', this.restId).where('status', '==', 'Approved').orderBy('createdAt', 'desc').where('resManagerId', '==', user).onSnapshot(res => {
          res.forEach(doc => {
            this.ApprovedBooking.push(Object.assign(doc.data(), {uid:doc.id}))
            console.log('Approved Booking: ', this.ApprovedBooking)
            this.approvedSize = (this.ApprovedBooking).length
            console.log('Approved size: ', this.approvedSize)
          })
        })
      });
    });
  }

  //Booking status
  status(restId, bookId, status){
    this.restaurantService.bookingStatus(restId, bookId, status);
    // this.disableButton = true;
  }

  ago(time){
    let difference = moment(time).diff(moment())
    return moment.duration(difference).humanize();
  }

}
