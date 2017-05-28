import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-quote-detail',
  templateUrl: 'quote-detail.html',
})
export class QuoteDetail {

  quoteItem: any;



  constructor(public navCtrl: NavController, public navP: NavParams, private alertCtrl: AlertController) {
      this.quoteItem = navP.get('quoteItem');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuoteDetail');
  }



}
