import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the SubmitQuote page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-submit-quote',
  templateUrl: 'submit-quote.html',
})
export class SubmitQuote {

  authorData: any = [];

  trueOrFalse: any = "";

  category: number = 0;

  author: any = "";

  quote: any = "";

  source: any = "";

  date: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController) {
  }

  ionViewWillEnter(){
    firebase.database().ref('Quoteclub/authors/').once('value', snapshot => {
      for( let i in snapshot.val()){
        let tempArray = {
          id: i,
          name: snapshot.val()[i]
        }
        this.authorData.push(tempArray);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitQuote');
  }

  catchEvent() {

    if(!this.checkInputs()){

    }else{
      this.showAlert("Nicht alle Felder wurden ausgefüllt. Alle Angaben sind erforderlich.")
    }

  }

  checkInputs() {
    if (this.trueOrFalse == "" || this.category == 0 || this.author == ""
      || this.quote == "" || this.source == "" || this.date == "") {
        return true;
    }
    return false;
  }

  showAlert(message: any){
    let alert = this.alertController.create({
      title: 'Fehlende Angaben',
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  submitQuote(){

    //IN ARBEIT

    return firebase.database().ref('Quoteclub/quotes/').set({
      category: this.category,
      quote: this.quote
    })
  }

}
