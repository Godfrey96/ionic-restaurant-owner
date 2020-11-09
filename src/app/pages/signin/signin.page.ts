import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  loginForm: FormGroup;
  spin: boolean = false;

  constructor(
              public nav: NavController,
              public loadingCtrl: LoadingController,
              private fb: FormBuilder,
              private authService: AuthService,
              private alertCtrl: AlertController
            ) { 
              // this.authService.getSession();
            }

  ngOnInit() {
    // this.authService.signAuth();
    this.loginOwner();
    
  }
  loginOwner(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login_Owner(){

    const loading = await this.loadingCtrl.create();

    this.authService.signAuth();
 
    console.log(this.loginForm.value);

    this.authService.signinOwner(this.loginForm.value.email, this.loginForm.value.password).then((res) => {
      console.log(res.user);
    }).then(() => {
      loading.dismiss().then(() => {
        this.nav.navigateRoot('/dashboard');
      });
    },
    error => {
      loading.dismiss().then(() => {
        console.log(error);
      });
    }
    );
    return await loading.present();

    // this.authService.signinOwner(this.loginForm.value.email, this.loginForm.value.password).then((res) => {
    //   console.log(res.user);

    //   if(res.user.uid){
    //     this.nav.navigateRoot('/dashboard');
    //   }else{
    //     this.nav.navigateRoot('/add-restaurant');
    //   }
      
    // })

    // async error => {
    //   const alert = await this.alertCtrl.create({
    //     message: error.message,
    //     buttons: [{ text: 'Ok', role: 'cancel' }],
    //   });
    //   await alert.present();
    // }
    //);
  }

}
