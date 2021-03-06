import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

import firebase from 'firebase/app';
import 'firebase/firestore'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  @ViewChild('barCanvas', { static: true }) barCanvas: ElementRef;
  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas: ElementRef;
  doughnutChart: any;

  bookRestaurants: Array<any> = [];
  approvedBookings: Array<any> = [];
  cancelledBookings: Array<any> = [];
  allBookings: Array<any> = [];
  reviews: Array<any> = [];
  restId: string;
  bookId: any;
  bookingDetails: firebase.firestore.DocumentData;
  pendingBooking: number = 0;
  approvedBook: number = 0;
  cancelBook: number = 0;
  totalReviews: number = 0;
  allTotalBooking: number = 0;

  constructor() { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      if(user){

        // fetching pending
        firebase.firestore().collectionGroup('bookings').where('resManagerId', '==', user.uid).where('status', '==', 'Pending').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.bookRestaurants.push(Object.assign(doc.data(), {uid:doc.id}))
            console.log('boook: ', this.bookRestaurants)
            this.restId = doc.data().restId
            this.bookId = doc.data().bookId
            console.log('rest - id: ', this.restId)
            console.log('book - id: ', this.bookId)
            this.pendingBooking = (this.bookRestaurants).length
            console.log('pendingBooking: ', this.pendingBooking)
            this.loadPieChartData();

            // firebase.firestore().collection('restaurants').doc(this.restId).collection('bookings').doc(this.bookId).get().then(snap => {
            //   this.bookingDetails = snap.data()
            //   console.log('booking details: ', this.bookingDetails)
            // })

          })
        })

        // fetching approved bookings
        firebase.firestore().collectionGroup('bookings').where('resManagerId', '==', user.uid).where('status', '==', 'Approved').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.approvedBookings.push(Object.assign(doc.data(), {uid:doc.id}))
            console.log('approved book: ', this.approvedBookings)
            this.approvedBook = (this.approvedBookings).length
            console.log('approvedBook: ', this.approvedBook)
            this.loadPieChartData();

          })
        })

        // fetching cancelled bookings
        firebase.firestore().collectionGroup('bookings').where('resManagerId', '==', user.uid).where('status', '==', 'Cancelled').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.cancelledBookings.push(Object.assign(doc.data(), {uid:doc.id}))
            console.log('Cancelled book: ', this.cancelledBookings)
            this.cancelBook = (this.cancelledBookings).length
            console.log('cancelledBook: ', this.cancelBook)
            this.loadPieChartData();

          })
        })

        // fetching all bookings
        firebase.firestore().collectionGroup('bookings').where('resManagerId', '==', user.uid).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.allBookings.push(Object.assign(doc.data(), {uid:doc.id}))
            console.log('ALL BOOKINGS: ', this.allBookings)
            this.allTotalBooking = (this.allBookings).length
            console.log('TOTAL BOOKINGS: ', this.allTotalBooking)
            this.loadPieChartData();

          })
        })

        // fetching reviews
        firebase.firestore().collectionGroup('reviews').where('resManagerId', '==', user.uid).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.reviews.push(Object.assign(doc.data(), {uid:doc.id}))
            console.log('reviews: ', this.reviews)
            this.totalReviews = (this.reviews).length
            console.log('total reviews: ', this.totalReviews)

          })
        })

        // firebase.firestore().collection('restaurants').where('ownerId', '==', user.uid).onSnapshot(res => {
        //   res.forEach(doc => {
        //     this.bookRestaurants.push(Object.assign(doc.data(), {uid:doc.id}))
        //     this.restId = {uid:doc.id}.uid
        //     console.log('rest id: ', this.restId)
        //   })
        // })

      }
    })

  }

  loadPieChartData() {

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      data: {
        // labels: [`Ticket Sold ${this.ticketSold / this.totalTicket * 100}%`, `Tickets left ${this.ticketAvailable / this.totalTicket * 100}%`],
        labels: [`Pending ${this.pendingBooking}`, `Approved ${this.approvedBook}`, `Cancelled ${this.cancelBook}`],
        datasets: [
          {
            label: '# of Votes',
            data: [this.pendingBooking, this.approvedBook, this.cancelBook],
            backgroundColor: [
              '#F37121', '#056608', '#C70039'
            ],
            hoverBackgroundColor: ['#FFBD69', '#f83f73']
          }
        ]
      }
    });

  }


  isDisplay = false;
  displays = true;
  displayDetail = true;

  toggleDisplay() {
    this.isDisplay = false;
    this.displays = true;
    this.displayDetail = true;
  }
  toggleDisplayNot() {
    this.isDisplay = true;
    this.displays = false;
    this.displayDetail = true;
  }
  toggleDisplayDetail() {
    this.isDisplay = true;
    this.displays = true;
    this.displayDetail = false;
  }

}
