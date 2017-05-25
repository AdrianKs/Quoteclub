import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitQuote } from './submit-quote';

@NgModule({
  declarations: [
    SubmitQuote,
  ],
  imports: [
    IonicPageModule.forChild(SubmitQuote),
  ],
  exports: [
    SubmitQuote
  ]
})
export class SubmitQuoteModule {}
