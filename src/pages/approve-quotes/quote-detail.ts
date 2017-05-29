import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-quote-detail',
  templateUrl: 'quote-detail.html',
})
export class QuoteDetail {

  submittedItem: any;
  reportedItem: any;
  dataCategory: any;
  dataUser: any;
  dataAuthor: any;
  dataQuotes: any;



  constructor(public navCtrl: NavController, public navP: NavParams, private alertCtrl: AlertController) {
      this.submittedItem = navP.get('submittedItem');
      this.reportedItem = navP.get('reportedItem');
      this.dataCategory = navP.get('dataCategory');
      this.dataUser = navP.get('dataUser');
      this.dataAuthor = navP.get('dataAuthor');
      this.dataQuotes = navP.get('dataQuotes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuoteDetail');
  }



}
