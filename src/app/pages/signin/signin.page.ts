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
  isSubmitted: boolean = false;
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
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please provide valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password cannot be less than 5 characters.' },
      { type: 'maxlength', message: 'Password cannot be more than 10 characters.' }
    ]
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
