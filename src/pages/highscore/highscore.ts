import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { QuoteManagementProvider } from '../../providers/quoteManagement-provider';

/**
 * Generated class for the Highscore page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-highscore',
  templateUrl: 'highscore.html',
  providers: [QuoteManagementProvider]
})
export class Highscore {

  ionViewWillEnter() {
    this.loadData(true, null);
  }

  currentUser: String = "wdJTAtwZE2QHMWocLwaKDnyW8YF2";
  dataUser: any;
  loading: any;
  rank: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private quoteManagementProvider: QuoteManagementProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Highscores');
  }

  loadData(showLoading: boolean, event): void {
    if (showLoading) {
      this.createAndShowLoading();
    }
    this.quoteManagementProvider.setUser().then((data) => {
      this.dataUser = this.quoteManagementProvider.dataUser;
      let counter = 1;
      for (let i in this.dataUser){
        this.dataUser[i].rank = counter;
        counter++;
      }
      console.log(this.dataUser);
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

}
