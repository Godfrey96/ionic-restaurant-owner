// import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  ownerForm: FormGroup;
  isSubmitted: boolean = false;
  spin: boolean = false;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.addOwner();
  }

  addOwner() {
    this.ownerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      mobile: ['',  [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  // get errorControl() {
  //   return this.ownerForm.controls;
  // }

  get name() {
    return this.ownerForm.get("name");
  }

  get email() {
    return this.ownerForm.get("email");
  }

  get mobile() {
    return this.ownerForm.get("mobile");
  }

  get password() {
    return this.ownerForm.get("password");
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxLength', message: 'Name cannot be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please provide valid email.' }
    ],
    mobile: [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile number cannot be less than 10 digits.' },
      { type: 'maxlength', message: 'Mobile number cannot be more than 10 digits.' },
      { type: 'pattern', message: 'Only numerical values allowed.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password cannot be less than 5 characters.' },
      { type: 'maxlength', message: 'Password cannot be more than 10 characters.' }
    ]
  }

  async register_Owner() {

    const alert = await this.alertCtrl.create({

      message: `Your account is registered successfully, click Okay to continue to login.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log(this.ownerForm.value);
            this.isSubmitted = true;
            if(this.ownerForm.valid){
              this.authService.signupOwner(this.ownerForm.value.email, this.ownerForm.value.password).then((res) => {
                return firebase.firestore().collection('owners').doc(res.user.uid).set({
                  name: this.ownerForm.value.name,
                  mobile: this.ownerForm.value.mobile
                }).then(() => {
                  console.log(res.user);
                  this.nav.navigateRoot('/signin');
                }).catch(function (error) {
                  console.log(error);
                });
              })
            }else{
              console.log('Invalid field')
            }
            
          }
        },
      ]

    });
    return await alert.present();

  }

}
