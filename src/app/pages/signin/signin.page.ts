import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean = false;
  spin: boolean = false;
  owners: any;
  name: any;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    // this.authService.getSession();
  }

  ngOnInit() {
    this.loginOwner();

  }
  
  loginOwner() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  get errorCtr() {
    return this.loginForm.controls
  }


  async login_Owner() {

    this.isSubmitted = true;

    if (this.loginForm.valid) {

      const loading = await this.loadingCtrl.create();

      this.authService.signAuth();

      console.log(this.loginForm.value);

      this.authService.signinOwner(this.loginForm.value.email, this.loginForm.value.password).then((res) => {
        console.log(res.user);

        //Getting logged in owner
        let user = firebase.auth().currentUser.uid
        console.log('user: ', user)
        firebase.firestore().collection('restaurantManagers').doc(user).get().then(async snapshot => {
          this.owners = snapshot.data();
          this.name = snapshot.get('name');
          console.log('name: ', this.name)
          console.log('new data: ', this.owners)

          const toast = await this.toastCtrl.create({
            message: "Welcome " + this.name,
            duration: 3000
          });
          toast.present();

        })

      }).then(() => {

        loading.dismiss().then(() => {
          this.nav.navigateRoot('/tabs/dashboard');
        });
      },
        async error => {
          const toast = await this.toastCtrl.create({
            message: error.message,
            duration: 3000
          });
          toast.present();
          loading.dismiss().then(() => {
            console.log(error);
          });
        }
      );
      return await loading.present();

    }else{
      console.log('All fields are required')
      const alert = await this.alertCtrl.create({
            
        cssClass: 'my-custom-class',
        message: `All fields are required`,
        buttons: [
          {
            text: 'Okay'
          }
        ]

      });
      return await alert.present();
    }

  }

}
