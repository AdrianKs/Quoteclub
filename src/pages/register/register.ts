import { Component } from '@angular/core';
import {IonicPage, NavController, LoadingController, AlertController} from 'ionic-angular';
import {AuthData} from "../../providers/auth-data";
import {FormBuilder, Validators, FormControl} from "@angular/forms";
import {Game} from "../game/game";

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthData]
})
export class Register {

  public signupForm;
  public passwordGroup;
  usernameChanged: boolean = false;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  passwordConfirmChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController,
              public authData: AuthData,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      email: ['', Validators.compose([Validators.required, this.isAMail])],
      passwords: formBuilder.group({
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        passwordConfirm: ['', Validators.compose([Validators.required])]
      }, {validator: this.matchPassword})
    });
    this.passwordGroup = this.signupForm.controls.passwords;
  }

  matchPassword(group) {
    let password = group.controls.password;
    let confirm = group.controls.passwordConfirm;
    if (!(password.value === confirm.value)) {
      return {"incorrectConfirm": true};
    }
    return null;
  }

  /**
   * This method checks if a input field was changed
   * @param input Input field to check
   */
  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  /**
   * This function checks if the input is a Email with a Regex.
   * @param c Formcontrol of the input form to check
   * @returns {boolean}
   */
  isAMail(c: FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (c.value != "" && (c.value.length <= 5 || !EMAIL_REGEXP.test(c.value))) {
      return {"incorrectMailFormat": true};
    }

    return null;
  }

  /**
   * This function signs up the user in firebase and creates a userprofile in the databse
   * All connections to firebase are managed in the provider auth-data
   * The field gender is not managed with the signupForm, because of an error that occured in the
   * combination of formcontrol with ion-select
   */
  signupUser() {
    this.submitAttempt = true;

    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(
        this.signupForm.value.email,
        this.passwordGroup.value.password,
        this.signupForm.value.username,
      ).then(() => {
        //Füge den Spieler gleich irgendwo hinzu in utilities
        //this.utilities.addPlayerToTeam(this.team, this.utilities.user.uid);
        this.navCtrl.setRoot(Game);
      }, (error) => {
        this.loading.dismiss();
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

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
