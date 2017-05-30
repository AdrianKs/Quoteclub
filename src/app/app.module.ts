import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Game} from "../pages/game/game";
import {About} from "../pages/about/about";
import {ApproveQuotes} from "../pages/approve-quotes/approve-quotes";
import {QuoteDetail} from "../pages/approve-quotes/quote-detail";
import {Highscore} from "../pages/highscore/highscore";
import {Login} from "../pages/login/login";
import {Register} from "../pages/register/register";
import {ResetPassword} from "../pages/reset-password/reset-password";
import {Settings} from "../pages/settings/settings";
import {SubmitQuote} from "../pages/submit-quote/submit-quote";
import { SwipeCardsModule } from "ng2-swipe-cards";
import { ProgressBar } from "../components/progress-bar/progress-bar";



@NgModule({
  declarations: [
    MyApp,
    Game,
    About,
    ApproveQuotes,
    QuoteDetail,
    Highscore,
    Login,
    Register,
    ResetPassword,
    Settings,
    SubmitQuote,
    ProgressBar
  ],
  imports: [
    BrowserModule,
    SwipeCardsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Game,
    About,
    ApproveQuotes,
    QuoteDetail,
    Highscore,
    Login,
    Register,
    ResetPassword,
    Settings,
    SubmitQuote
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
