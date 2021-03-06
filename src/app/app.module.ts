import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Game} from "../pages/game/game";
import {About} from "../pages/about/about";
import {ApproveQuotes} from "../pages/approve-quotes/approve-quotes";
import {Highscore} from "../pages/highscore/highscore";
import {Login} from "../pages/login/login";
import {Register} from "../pages/register/register";
import {ResetPassword} from "../pages/reset-password/reset-password";
import {Settings} from "../pages/settings/settings";
import {SubmitQuote} from "../pages/submit-quote/submit-quote";

@NgModule({
  declarations: [
    MyApp,
    Game,
    About,
    ApproveQuotes,
    Highscore,
    Login,
    Register,
    ResetPassword,
    Settings,
    SubmitQuote
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Game,
    About,
    ApproveQuotes,
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
