import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import 'firebase/firestore'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  booking: Array<any> = [];
  restaurants: Array<any> = [];
  reviews: Array<any> = [];
  restId: any;
  bookingSize: any;
  reviewSize: any;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.authService.signAuth();

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {

        // let user = firebase.auth().currentUser.uid
        // console.log('user: ', user)

        //fetching all restaurants
        firebase.firestore().collection('restaurants').onSnapshot(res => {
          res.forEach(element => {
            this.restaurants.push(Object.assign(element.data(), { uid: element.id }));
            this.restId = { uid: element.id }.uid;

            firebase.firestore().collection('restaurants').doc(this.restId).collection('reviews').where('restId', '==', this.restId).orderBy('createdAt', 'desc').where('resManagerId', '==', user.uid).onSnapshot(res => {
              res.forEach(doc => {
                this.reviews.push(doc.data());
                this.reviewSize = (this.reviews).length
              });
            });

          });
        });

      } else {
        const alert = await this.alertCtrl.create({

          cssClass: 'my-custom-class',
          message: `You must be log in`,
          buttons: [
            {
              text: 'Okay'
            }
          ]

        });
        return await alert.present();
      }
    })
  }

}
