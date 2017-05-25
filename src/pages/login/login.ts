import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, MenuController, LoadingController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthData} from "../../providers/auth-data";
import {Game} from "../game/game";
import {Register} from "../register/register";
import {ResetPassword} from "../reset-password/reset-password";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthData]
})
export class Login {

  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData,
              public formBuilder: FormBuilder,public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public menuCtrl: MenuController) {

    this.menuCtrl.enable(false, 'mainMenu');

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  loginUser(){
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.navCtrl.setRoot(Game);
        this.menuCtrl.enable(true, 'mainMenu');
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: this.authData.getErrorMessage(error),
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToSignup(){
    this.navCtrl.push(Register);
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPassword);
  }


}
