import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { QuoteManagementProvider } from '../../providers/quoteManagement-provider';
import { QuoteDetail } from './quote-detail';

/**
 * Generated class for the ApproveQuotes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-approve-quotes',
  templateUrl: 'approve-quotes.html',
  providers: [QuoteManagementProvider]
})
export class ApproveQuotes {

  ionViewWillEnter() {
    this.loadData(true, null);
  }

  editStatus: string = "submitted";
  dataSubmitted: any;
  dataReported: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private quoteManagementProvider: QuoteManagementProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApproveQuotes');
  }

  loadData(showLoading: boolean, event): void {
    if (showLoading) {
      this.createAndShowLoading();
    }
    this.quoteManagementProvider.setSubmitted().then((data) => {
      this.dataSubmitted = this.quoteManagementProvider.dataSubmittedQuotes;
      console.log(this.quoteManagementProvider.dataSubmittedQuotes);
      if(event!=null){
        event.complete();
      }
    }).catch(function (error) {
      if (showLoading) {
        this.createAndShowErrorAlert(error);
      }
    });
    this.quoteManagementProvider.setReported().then((data) => {
      this.dataReported = this.quoteManagementProvider.dataReportedQuotes;
      console.log(this.quoteManagementProvider.dataReportedQuotes);
      if (showLoading) {
      this.loading.dismiss().catch((error) => console.log(error));
      }
      if(event!=null){
        event.complete();
      }
    }).catch(function (error) {
      if (showLoading) {
        this.createAndShowErrorAlert(error);
      }
    });
  }

  createAndShowErrorAlert(error) {
      let alert = this.alertCtrl.create({
        title: 'Fehler beim Empfangen der Daten',
        message: 'Beim Empfangen der Daten ist ein Fehler aufgetreten :-(',
        buttons: ['OK']
      });
      alert.present();
    }

  createAndShowLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios'
    })
    this.loading.present();
  }

  openDetails(event, value){
    this.navCtrl.push(QuoteDetail, { quoteItem: value });
  }

}
