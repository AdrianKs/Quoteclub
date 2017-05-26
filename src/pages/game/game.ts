import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class Game implements OnInit, OnDestroy {
  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: {
      backgroundColor: '#28e93b'
    },
    dislike: {
      backgroundColor: '#e92828'
    }
  };
  ticks = 0;
  timer;
  sub: Subscription;
  loadProgress = 100;

  ngOnInit() {
    this.timer = Observable.timer(1000, 1000);
    this.sub = this.timer.subscribe(t => this.tickerFunc(t));
  }

  tickerFunc(tick) {
    this.loadProgress = this.loadProgress - 6.66;
    this.ticks = tick
    if(this.loadProgress <= 6.67){
      this.sub.unsubscribe();
    }
    console.log(this.loadProgress);
  }

  ngOnDestroy() {
    console.log("Destroy timer");
    // unsubscribe here
    this.sub.unsubscribe();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 0; i < 50; i++) {
      this.attendants.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter()
      });
    }
    this.ready = true;
  }

  onCardInteract(event) {
    console.log(event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Game');
  }

}


//https://www.npmjs.com/package/ng2-swipe-cards
//https://embed.plnkr.co/ebTZz51SsYUs7wzLemuo/