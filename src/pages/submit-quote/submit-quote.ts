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

  authorInput:any = "";

  authorChoice: any = "";

  authorData: any = [];
  
  authorDataSearch:any = [];

  trueOrFalse: any = "";

  category: number = 0;

  author: any = "";

  newAuthorEntered: boolean = true;

  enteredAuthor: any = "";

  authorChosen: boolean = false;

  authorNameTempVar: any = "";

  language: any = "";

  quote: any = "";

  context: any = "";

  source: any = "";

  date: any = "";

  buttonDisabledStub: boolean = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController) {
  }

  ionViewWillEnter() {
    this.fetchAuthorData();
  }

  fetchAuthorData(){
    this.authorData = [];
    this.authorDataSearch = [];
    firebase.database().ref('authors/').once('value', snapshot => {
      for (let i in snapshot.val()) {
        let tempArray = {
          id: i,
          name: snapshot.val()[i].name
        }
        this.authorData.push(tempArray);
      }
      this.authorDataSearch = this.authorData;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitQuote');
  }

  catchEvent() {

    this.buttonDisabledStub = true;

    if (!this.checkInputs()) {
      
        if (this.checkIfAuthorChosen()) {
          let data = this.prepareQuoteData();
          let thatIs = this;
          this.insertJSONData('quotes/', data).then(function () {
            thatIs.showAlert("Erfolg", "Zitat hinzugefügt!", true);
            thatIs.navCtrl.popToRoot();
          }).catch(function () {
            thatIs.showAlert("Fehler", "Zitat konnte nicht hinzugefügt werden. Wir arbeiten dran.", false);
          });
        } else {
          let data = this.prepareAuthorData();
          let authorID = this.makeid();
          let thatIs = this;
          this.insertJSONDataWithChild('authors', data, authorID).then(function () {
            thatIs.author = authorID;
            let data = thatIs.prepareQuoteData();
            thatIs.insertJSONData('quotes', data).then(function () {
              thatIs.showAlert("Erfolg", "Zitat mit neuem Autor hinzugefügt!", true);
              thatIs.navCtrl.popToRoot();
            })
          })
        }
      

    } else {
      this.showAlert("Fehlende Angaben", "Nicht alle Felder wurden ausgefüllt. Alle Angaben sind erforderlich.", false)
    }

  }

  checkInputs() {

    
      if (this.trueOrFalse == "" || this.category == 0 || this.authorInput == "" || this.language=="" 
        || this.quote == "") {
        return true;
      }else{
        return false;
      }
   
    
  }

  checkIfAuthorChosen() {
    if(this.newAuthorEntered == true){
      return false;
    }
    return true;
  }



  showAlert(title: any, message: any, clearInputs: any) {
    let alert = this.alertController.create({
      title: title,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.buttonDisabledStub = null;
          if(clearInputs){
          this.clearAndResetInputs();
          this.fetchAuthorData();
          }
        }
      }]
    });
    alert.present();
  }

  prepareQuoteData() {
    let data = {
      category: this.category,
      author: this.author,
      real: this.trueOrFalse,
      date: this.date,
      context: this.context,
      language: this.language,
      source: this.source,
      quote: this.quote
    }
    return data;
  }

  prepareAuthorData() {
    this.enteredAuthor = this.authorInput;
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

  resetData(){
    this.authorData = this.authorDataSearch;
  }

  filterItems(){
    this.resetData();

    let val = this.authorInput;

    if (val && val.trim() != '') {
      this.authorData = this.authorData.filter((author) => {
        return (author.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }


  }

  setAuthor(value:any, authorNameTemp:any){
    this.author = value;
    this.authorChosen = true;
    this.authorNameTempVar = authorNameTemp;
    this.newAuthorEntered = false;
  }

  resetAuthorChoice(){
    this.author = "";
    this.authorChosen = false;
    this.authorNameTempVar = "";
    this.newAuthorEntered = true;
  }


  clearAndResetInputs(){
    this.newAuthorEntered = true;
    this.authorInput = "";
    this.authorChosen = false;
    this.author = "";
    this.trueOrFalse = "";
    this.category = 0;
    this.enteredAuthor = "";
    this.authorNameTempVar = "";
    this.language = "";
    this.source = "";
    this.date = "";
    this.context = "";
    this.quote = "";
  }


}
