import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import firebase from 'firebase/app';


var firebaseConfig = {
  apiKey: "AIzaSyDTvKMZJccu0P2x3PZCXiCkf9R3Fn58mx4",
  authDomain: "ionic-restaurant-d4af9.firebaseapp.com",
  databaseURL: "https://ionic-restaurant-d4af9.firebaseio.com",
  projectId: "ionic-restaurant-d4af9",
  storageBucket: "ionic-restaurant-d4af9.appspot.com",
  messagingSenderId: "788766068469",
  appId: "1:788766068469:web:7fa2cde3d1eb233bb7bfbc",
  measurementId: "G-0VWW908GMC"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    firebase.initializeApp(firebaseConfig);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
