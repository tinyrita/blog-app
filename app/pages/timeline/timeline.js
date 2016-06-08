import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the TimelinePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/timeline/timeline.html',
})
export class TimelinePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
