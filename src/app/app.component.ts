import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {About} from "../pages/about/about";
import {ApproveQuotes} from "../pages/approve-quotes/approve-quotes";
import {Game} from "../pages/game/game";
import {Highscore} from "../pages/highscore/highscore";
import {Settings} from "../pages/settings/settings";
import {SubmitQuote} from "../pages/submit-quote/submit-quote";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Game;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'About', component: About },
      { title: 'Approve Quotes', component: ApproveQuotes },
      { title: 'Game', component: Game },
      { title: 'Highscore', component: Highscore },
      { title: 'Settings', component: Settings },
      { title: 'Submit Quote', component: SubmitQuote },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
