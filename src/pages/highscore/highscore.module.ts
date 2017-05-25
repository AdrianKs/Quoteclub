import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Highscore } from './highscore';

@NgModule({
  declarations: [
    Highscore,
  ],
  imports: [
    IonicPageModule.forChild(Highscore),
  ],
  exports: [
    Highscore
  ]
})
export class HighscoreModule {}
