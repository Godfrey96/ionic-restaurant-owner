import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { AuthService } from 'src/app/services/auth.service';


import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {

  addRestaurantForm: FormGroup;
  spin: boolean = false;

  ownerId: any;
  isSubmitted: boolean = false;

  selectedFile: File = null;
  upLoadedFile: any;
  restId: any;

  constructor(
    public loadingCtrl: LoadingController,
    public nav: NavController,
    private fb: FormBuilder,
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private alertCtrl: AlertController
  ) {  }

  ngOnInit() {
    if(this.authService.signAuth()){
      this.addRestaurant();
    }else{
      console.log('error')
    }
    
  }

  addRestaurant() {
    this.addRestaurantForm = this.fb.group({
      resName: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      website: ['', Validators.required],
      imgUrl: ['', Validators.required],
      address: ['', Validators.required]
      // address: this.fb.array([this.addAddressGroup()]),
    });
  }

  get errorCtr() {
    return this.addRestaurantForm.controls
  }


  onFileSelected(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadstart = (p) => {
      console.log(p);
    };
    reader.onloadend = (e) => {
      console.log(e.target);
      this.upLoadedFile = reader.result;
      this.addRestaurantForm.get('imgUrl').setValue(this.upLoadedFile);
      //console.log(this.upLoadedFile);
    };
  }

  // addAddressGroup() {
  //   return this.fb.group({
  //     street: ['', [Validators.required, Validators.maxLength(100)]],
  //     city: ['', [Validators.required, Validators.maxLength(100)]],
  //     province: ['', [Validators.required, Validators.maxLength(100)]],
  //     zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
  //   });
  // }

  // addAddress() {
  //   this.addressArray.push(this.addAddressGroup());
  // }

  // removeAddress(index) {
  //   this.addressArray.removeAt(index);
  // }

  // get addressArray() {
  //   return <FormArray>this.addRestaurantForm.get('address');
  // }


  async addRes() {

    firebase.auth().onAuthStateChanged(async (user) => {
      if(user){

        this.isSubmitted = true;
        if(this.addRestaurantForm.valid){

          const alert = await this.alertCtrl.create({

            message: `Your restaurant is added successfulluy, please click Okay to confirm`,
            buttons: [
              {
                text: 'Okay',
                handler: () => {
      
                  console.log(this.addRestaurantForm.value);
                  var user = firebase.auth().currentUser
                  this.ownerId = user.uid;
      
                  // Add Restaurant
                  firebase.firestore().collection('restaurants').add({
                    ownerId: this.ownerId,
                    resName: this.addRestaurantForm.value.resName,
                    phone: this.addRestaurantForm.value.phone,
                    email: this.addRestaurantForm.value.email,
                    website: this.addRestaurantForm.value.website,
                    imgUrl: this.addRestaurantForm.value.imgUrl,
                    address: this.addRestaurantForm.value.address,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                  }).then((doc) => {
                    doc.set({ restId: doc.id }, { merge: true }).then(() => {
                      console.log('REST_ID: ', this.restId)
                    })
                    this.nav.navigateRoot('/profile');
                    this.addRestaurantForm.reset();
                  }).catch(function(error){
                    console.log(error)
                  });
                },
              },
            ]
          });
          return await alert.present();

        }else{

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

      }else{
        const alert = await this.alertCtrl.create({
            
          cssClass: 'my-custom-class',
          message: `In order to create a restaurant you must be logged in`,
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
