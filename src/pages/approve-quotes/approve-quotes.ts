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
  dataQuotes: any;
  dataSubmitted: any;
  dataReported: any;
  dataUser: any;
  dataAuthor: any;
  dataCategory: any;
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
    this.quoteManagementProvider.setQuotes().then((data) => {
      this.dataQuotes = this.quoteManagementProvider.dataQuotes;
      console.log(this.quoteManagementProvider.dataQuotes);
      if(event!=null){
        event.complete();
      }
    }).catch(function (error) {
      if (showLoading) {
        this.createAndShowErrorAlert(error);
      }
    });
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
      if(event!=null){
        event.complete();
      }
    }).catch(function (error) {
      if (showLoading) {
        this.createAndShowErrorAlert(error);
      }
    });
    this.quoteManagementProvider.setCategory().then((data) => {
      this.dataCategory = this.quoteManagementProvider.dataCategory;
      console.log(this.quoteManagementProvider.dataCategory);
      if(event!=null){
        event.complete();
      }
    }).catch(function (error) {
      if (showLoading) {
        this.createAndShowErrorAlert(error);
      }
    });
    this.quoteManagementProvider.setAuthor().then((data) => {
      this.dataAuthor = this.quoteManagementProvider.dataAuthor;
      console.log("AUTHORS");
      console.log(this.quoteManagementProvider.dataAuthor);
      if(event!=null){
        event.complete();
      }
    }).catch(function (error) {
      if (showLoading) {
        this.createAndShowErrorAlert(error);
      }
    });
    this.quoteManagementProvider.setUser().then((data) => {
      this.dataUser = this.quoteManagementProvider.dataUser;
      console.log(this.quoteManagementProvider.dataUser);
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

  openDetails(event, submittedItem, reportedItem){
    this.navCtrl.push(QuoteDetail, { submittedItem: submittedItem, reportedItem: reportedItem, dataCategory: this.dataCategory, dataUser: this.dataUser, dataAuthor: this.dataAuthor, dataQuotes: this.dataQuotes});
  }

  delete(item){
     let confirm = this.alertCtrl.create({
      title: 'Wirklich löschen?',
      message: 'Der Löschvorgang kann nicht mehr rückgängig gemacht werden',
      buttons: [
        {
          text: 'Nein',
          handler: () => {}
        },
        {
          text: 'Ja',
          handler: () => {
            item.deleted = true;
            //firebase delete
            //evtl. Meldung = nicht approved bzw. Report nicht aussagekräftig genug
          }
        }
      ]
    });
    confirm.present();
  }

  doRefresh(refresher) {
    this.loadData(false, refresher);
  }
}
