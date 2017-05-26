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

  authorChoice: any = "";

  authorData: any = [];

  trueOrFalse: any = "";

  category: number = 0;

  author: any = "";

  enteredAuthor: any = "";

  quote: any = "";

  context: any = "";

  source: any = "";

  date: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController) {
  }

  ionViewWillEnter() {
    firebase.database().ref('authors/').once('value', snapshot => {
      for (let i in snapshot.val()) {
        let tempArray = {
          id: i,
          name: snapshot.val()[i].name
        }
        this.authorData.push(tempArray);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitQuote');
  }

  catchEvent() {

    if (!this.checkInputs()) {
      if (this.checkIfAuthorChosen() != null) {
        if (this.checkIfAuthorChosen()) {
          let data = this.prepareQuoteData();
          let thatIs = this;
          this.insertJSONData('quotes/', data).then(function () {
            thatIs.showAlert("Erfolg", "Zitat hinzugefügt!");
            thatIs.navCtrl.popToRoot();
          }).catch(function () {
            thatIs.showAlert("Fehlende Angaben", "Zitat konnte nicht hinzugefügt werden. Wir arbeiten dran.");
          });
        } else {
          let data = this.prepareAuthorData();
          let authorID = this.makeid();
          let thatIs = this;
          this.insertJSONDataWithChild('authors', data, authorID).then(function () {
            thatIs.author = authorID;
            let data = thatIs.prepareQuoteData();
            thatIs.insertJSONData('quotes', data).then(function () {
              thatIs.showAlert("Erfolg", "Zitat mit neuem Autor hinzugefügt!");
              thatIs.navCtrl.popToRoot();
            })
          })
        }
      } else {
        console.log("")
      }

    } else {
      this.showAlert("Fehlende Angaben", "Nicht alle Felder wurden ausgefüllt. Alle Angaben sind erforderlich.")
    }

  }

  checkInputs() {

    console.log(this.trueOrFalse);
    console.log(this.category);
    console.log(this.author);
    console.log(this.enteredAuthor);
    console.log(this.quote);
    console.log(this.context);
    console.log(this.source);
    console.log(this.date);

    if (this.authorChoice == "enter") {
      if (this.trueOrFalse == "" || this.category == 0 || this.enteredAuthor == ""
        || this.quote == "" || this.context == "" || this.source == "" || this.date == "") {
        return true;
      }else{
        return false;
      }
    } else if (this.authorChoice == "choose") {
      if (this.trueOrFalse == "" || this.category == 0 || this.author == ""
        || this.quote == "" || this.context == "" || this.source == "" || this.date == "") {
        return true;
      }else{
        return false;
      }
    } else{
      return false;
    }
  }

  checkIfAuthorChosen() {
    if (this.authorChoice == "choose") {
      return true;
    } else if (this.authorChoice == "enter") {
      return false;
    } else {
      return null;
    }
  }



  showAlert(title: any, message: any) {
    let alert = this.alertController.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  submitQuote(authorChosen: boolean) {

    if (authorChosen) {

    } else {

    }

    //IN ARBEIT

    return firebase.database().ref('Quoteclub/quotes/').set({
      category: this.category,
      quote: this.quote
    })
  }

  prepareQuoteData() {
    let data = {
      category: this.category,
      author: this.author,
      real: this.trueOrFalse,
      date: this.date,
      context: this.context,
      source: this.source,
      quote: this.quote
    }
    return data;
  }

  prepareAuthorData() {
    let data = {
      name: this.enteredAuthor
    }
    return data;
  }

  insertJSONData(firebasePath: any, dataAsJSON: any) {
    let id = this.makeid();
    return firebase.database().ref(firebasePath).child(id).set(dataAsJSON);
  }

  insertJSONDataWithChild(firebasePath: any, dataAsJSON: any, childID: any) {
    return firebase.database().ref(firebasePath).child(childID).set(dataAsJSON);
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 26; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}
