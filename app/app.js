import {ViewChild} from 'angular2/core';
import {App, Events, Platform, MenuController} from 'ionic-angular';
import {Toast} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {ConferenceData} from './providers/conference-data';
import {UserData} from './providers/user-data';
import {BlogData} from './providers/blog-data';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';

import {TabsBlogPage} from './pages/tabs/tabs-blog';
import {MapPage} from './pages/map/map';
import {AboutPage} from './pages/about/about';

@App({
  templateUrl: 'build/app.html',
  providers: [ConferenceData,UserData, BlogData],
  // Set any config for your app here, see the docs for
  // more ways to configure your app:
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {
    // Place the tabs on the bottom for all platforms
    // See the theming docs for the default values:
    // http://ionicframework.com/docs/v2/theming/platform-specific-styles/
    tabbarPlacement: "bottom"
  },
  queries: {
    nav: new ViewChild('content')
  }
})
class ConferenceApp {
  static get parameters() {
    return [
      [Events], [ConferenceData], [UserData], [Platform], [MenuController]
    ]
  }

  constructor(events, confData, userData, platform, menu) {
    this.userData = userData;
    this.events = events;
    this.menu = menu;
    this.aboutPage = AboutPage;
    this.mapPage = MapPage;

    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // load the conference data
    confData.load();

    // We plan to add auth to only show the login page if not logged in
    //this.root = TutorialPage;
    this.root = LoginPage;

    // create an list of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    this.appPages = [
      { title: '文章', component: TabsBlogPage, index: 0, icon: 'albums' },
      { title: '圈子', component: TabsBlogPage, index: 1, icon: 'timer' },
      { title: '我的', component: TabsBlogPage, index: 2, icon: 'person' },
    ];


    this.aboutPages = [
      { title: 'Map', component: MapPage, icon: 'map' },
      { title: 'About', component: AboutPage, icon: 'information-circle' },
    ];


    this.loggedOutPages = [
      { title: 'Login', component: LoginPage, icon: 'log-in' },
      { title: 'Signup', component: SignupPage, icon: 'person-add' }
    ]

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn == 'true');
    });

    this.listenToLoginEvents();
  }

  openPage(page) {
    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  presentToast(msg){
  let toast = Toast.create({
	  message: msg, 
	  duration:1000
  });

  this.nav.present(toast);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:notify', (data) => {
      this.presentToast(data.message);
    });
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      this.presentToast("登录成功。");
      this.nav.push(TabsBlogPage);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
      this.presentToast("注册成功。");
      this.nav.push(TabsBlogPage);
    });

    this.events.subscribe('user:logout', (err) => {
      this.enableMenu(false);
      this.presentToast(err);
      this.nav.push(LoginPage);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, "loggedInMenu");
    this.menu.enable(!loggedIn, "loggedOutMenu");
  }
}
