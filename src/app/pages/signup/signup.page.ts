// import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/database';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  ownerForm: FormGroup;

  spin: boolean = false;

  constructor(
    public nav: NavController,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.addOwner();
  }

  addOwner() {
    this.ownerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async register_Owner() {
    console.log(this.ownerForm.value);
    this.authService.signupOwner(this.ownerForm.value.email, this.ownerForm.value.password).then((res) => {
      return firebase.database().ref('owners/' + res.user.uid).set({
        firstName: this.ownerForm.value.firstName,
        lastName: this.ownerForm.value.lastName,
        mobile: this.ownerForm.value.mobile
      }).then(() => {
        console.log(res.user);
        this.nav.navigateRoot('/signin')
      });

    });
  }

}
