import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuoteDetail } from './quote-detail';

@NgModule({
  declarations: [
    QuoteDetail,
  ],
  imports: [
    IonicPageModule.forChild(QuoteDetail),
  ],
  exports: [
    QuoteDetail
  ]
})
export class QuoteDetailModule {}