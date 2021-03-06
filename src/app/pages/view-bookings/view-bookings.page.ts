import { RestaurantService } from 'src/app/services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, NavController, AlertController, ToastController } from '@ionic/angular';
import * as moment from 'moment';

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
  disableButton: boolean = false;
  restaurants: Array<any> = [];
  restId: any;
  bookingSize: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private authService: AuthService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.authService.signAuth();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        let user = firebase.auth().currentUser.uid
        console.log('user: ', user)

        //fetching all restaurants
        firebase.firestore().collection('restaurants').onSnapshot(res => {
          res.forEach(element => {
            this.restaurants.push(Object.assign(element.data(), { uid: element.id }));
            this.restId = { uid: element.id }.uid;

            firebase.firestore().collection('restaurants').doc(this.restId).collection('bookings').where('restId', '==', this.restId).orderBy('createdAt', 'desc').where('resManagerId', '==', user).onSnapshot(res => {
              res.forEach(doc => {
                this.booking.push(Object.assign(doc.data(), { uid: doc.id }))
                this.bookingSize = (this.booking).length
                console.log('booking size: ', this.bookingSize)
                console.log('DI BOOKINGS: ', this.booking)
              })
            })

          });
        });

      } else {
        console.log('not logged in')
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
