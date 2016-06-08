import {Page, NavParams} from 'ionic-angular';
import {BlogPage} from '../blog/blog';
import {TimelinePage} from '../timeline/timeline';
import {UserPage} from '../user/user';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavParams]];
  }

  constructor(navParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    // set the root pages for each tab
    this.tab1Root = BlogPage;
    this.tab2Root = TimelinePage;
    this.tab3Root = UserPage;
  }
}
