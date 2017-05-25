import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApproveQuotes } from './approve-quotes';

@NgModule({
  declarations: [
    ApproveQuotes,
  ],
  imports: [
    IonicPageModule.forChild(ApproveQuotes),
  ],
  exports: [
    ApproveQuotes
  ]
})
export class ApproveQuotesModule {}
