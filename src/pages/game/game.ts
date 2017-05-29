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
  cardCursor: number = 0;
  cardDirection = "x";
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
    if (this.loadProgress <= 6.67) {
      this.sub.unsubscribe();
      console.log("Destroy timer");
    }
  }

  ngOnDestroy() {
    console.log("Destroy timer");
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

  like(like) {
    var self = this;
    if (this.attendants.length > 0) {
      self.attendants[this.cardCursor++].likeEvent.emit({ like });
      // DO STUFF WITH YOUR CARD
      //this.tinderCardLogs.push("callLike(" + JSON.stringify({ like }) + ")");
      //this.scrollToBottom(this.tinderCardLogContainer);
      this.sub.unsubscribe();
      this.loadProgress = 100;
      this.sub = this.timer.subscribe(t => this.tickerFunc(t));
    }
  }

  onCardInteract(event) {
    console.log(event);
    this.sub.unsubscribe();
    this.loadProgress = 100;
    this.sub = this.timer.subscribe(t => this.tickerFunc(t));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Game');
  }

}


//https://www.npmjs.com/package/ng2-swipe-cards
//https://embed.plnkr.co/ebTZz51SsYUs7wzLemuo/