import {Page, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/blog/blog-add.html',
})
export class BlogAddPage {
  static get parameters() {
    return [[ViewController]];
  }

  constructor(viewCtrl) {
    this.viewCtrl = viewCtrl;
  }

  save() {
	  this.dismiss();
  }

  dismiss() {
	  let data = {};
	  this.viewCtrl.dismiss(data);
  }


}
