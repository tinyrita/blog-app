import {Page, NavParams, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/blog/blog-detail.html',
})
export class BlogDetailPage {
  static get parameters() {
    return [[NavController],[NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.blog = navParams.data;
    console.log(this.blog);
    console.log("!!!!");
  }
}
