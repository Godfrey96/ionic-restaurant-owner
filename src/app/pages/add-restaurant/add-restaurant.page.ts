import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/database';


import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {

  addRestaurantForm: FormGroup;
  spin: boolean = false;

  constructor(
    public nav: NavController,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.addRestaurant();
  }

  addRestaurant() {
    this.addRestaurantForm = this.fb.group({
      resName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      address: this.fb.array([this.addAddressGroup()]),
    });
  }

  addAddressGroup() {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
    });
  }

  addAddress() {
    this.addressArray.push(this.addAddressGroup());
  }

  removeAddress(index) {
    this.addressArray.removeAt(index);
  }

  get addressArray() {
    return <FormArray>this.addRestaurantForm.get('address');
  }

  addRes() {
    console.log(this.addRestaurantForm.value);
    var user = firebase.auth().currentUser

    firebase.database().ref('restaurants/' + user.uid).push().set({
      resName: this.addRestaurantForm.value.resName,
      phone: this.addRestaurantForm.value.phone,
      email: this.addRestaurantForm.value.email,
      website: this.addRestaurantForm.value.website,
      address: this.addRestaurantForm.value.address
      
    }).then((res) => {
      console.log('data: ' + res);
    });
  }

}
