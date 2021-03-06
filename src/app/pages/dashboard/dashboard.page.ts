import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import 'firebase/firestore'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  owners: any;

  booking: Array<any> = [];
  restaurants: Array<any> = [];
  reviews: Array<any> = [];
  ApprovedBooking: Array<any> = [];
  pendingBooking: Array<any> = [];
  cancelledBooking: Array<any> = [];
  restId: any;
  bookingSize: number = 0;
  reviewSize: number = 0;
  status: any;
  approvedSize: number = 0;
  pendingSize: number = 0;
  cancelledSize: number = 0;
  ownerId: any;

  constructor(private authService: AuthService) {
    // console.log(this.authService.getSession())
  }

  ngOnInit() {
    this.authService.signAuth();


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        // let user = firebase.auth().currentUser.uid
        // console.log('user: ', user)

        firebase.firestore().collection('restaurantManagers').doc(user.uid).get().then(snapshot => {
          this.owners = snapshot.data();
          console.log('new data: ', this.owners)
        })

        //fetching all restaurants
        firebase.firestore().collection('restaurants').where('ownerId', '==', user.uid).onSnapshot(res => {
          res.forEach(element => {
            this.restaurants.push(Object.assign(element.data(), { uid: element.id }));
            this.restId = { uid: element.id }.uid;
            this.ownerId = element.data().ownerId;
            console.log('RES MANAGER ID: ', this.ownerId)

            console.log('user loggin: ', user)
            // .where('resManagerId', '==', user)
            // determining the size of bookings
            firebase.firestore().collection('restaurants').doc(this.restId).collection('bookings').where('restId', '==', this.restId).orderBy('createdAt', 'desc').where('resManagerId', '==', user.uid).onSnapshot(res => {
              res.forEach(doc => {
                this.booking.push(Object.assign(doc.data(), { uid: doc.id }))
                this.bookingSize = (this.booking).length
                console.log('booking size: ', this.bookingSize)
                console.log('DI BOOKINGS: ', this.booking)
              })
            })

            // determining the size of approved bookings
            firebase.firestore().collection('restaurants').doc(this.restId).collection('bookings').where('restId', '==', this.restId).orderBy('createdAt', 'desc').where('resManagerId', '==', user.uid).where('status', '==', 'Approved').onSnapshot(res => {
              res.forEach(doc => {
                this.ApprovedBooking.push(Object.assign(doc.data(), { uid: doc.id }))
                this.approvedSize = (this.ApprovedBooking).length
                console.log('Approved size: ', this.approvedSize)
                console.log('DI BOOKINGS: ', this.booking)
              })
            })

            // determining the size of pending bookings
            firebase.firestore().collection('restaurants').doc(this.restId).collection('bookings').where('restId', '==', this.restId).orderBy('createdAt', 'desc').where('resManagerId', '==', user.uid).where('status', '==', 'Pending').onSnapshot(res => {
              res.forEach(doc => {
                this.pendingBooking.push(Object.assign(doc.data(), { uid: doc.id }))
                this.pendingSize = (this.pendingBooking).length
                console.log('Pending size: ', this.pendingSize)
                console.log('DI BOOKINGS: ', this.booking)
              })
            })

            // determining the size of cancelled bookings
            firebase.firestore().collection('restaurants').doc(this.restId).collection('bookings').where('restId', '==', this.restId).orderBy('createdAt', 'desc').where('resManagerId', '==', user.uid).where('status', '==', 'Cancelled').onSnapshot(res => {
              res.forEach(doc => {
                this.cancelledBooking.push(Object.assign(doc.data(), { uid: doc.id }))
                this.cancelledSize = (this.cancelledBooking).length
                console.log('Cancelled size: ', this.cancelledSize)
                console.log('DI BOOKINGS: ', this.booking)
              })
            })

            // determining the size of reviews
            firebase.firestore().collection('restaurants').doc(this.restId).collection('reviews').where('restId', '==', this.restId).where('resManagerId', '==', user.uid).orderBy('createdAt', 'desc').onSnapshot(res => {
              res.forEach(doc => {
                this.reviews.push(doc.data());
                this.reviewSize = (this.reviews).length
              });
            });

          });
        });

      }
    })


  }

}
