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

  constructor(private authService: AuthService) { 
    // console.log(this.authService.getSession())
  }

  ngOnInit() {
    // this.authService.signAuth();

    // let user = firebase.auth().currentUser.uid
    // console.log('user: ', user)


    // firebase.firestore().collection('owners').doc(user).get().then(snapshot => {
    //   this.owners = snapshot.data();
      //console.log('new data: ', this.owners)
    // })
  }

}
