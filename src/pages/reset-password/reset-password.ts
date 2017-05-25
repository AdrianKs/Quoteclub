import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthData} from "../../providers/auth-data";

/**
 * Generated class for the ResetPassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers: [AuthData]
})
export class ResetPassword {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPassword');
  }

}
