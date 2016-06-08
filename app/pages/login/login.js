import {IonicApp, Page, Toast, NavController} from 'ionic-angular';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import {TabsBlogPage} from '../tabs/tabs-blog';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
    return [[NavController], [UserData], [Events]];
  }

  constructor(nav, user, events) {
    this.nav = nav;
    this.user = user;
    this.events = events;
    this.storage = new Storage(LocalStorage);

    //检测登录状态
			  this.user.hasLoggedIn().then( (value) => {
				  if(value){
					  this.events.publish('user:notify',"欢迎回来。")
					  this.nav.push(TabsBlogPage);
				  }
			  });
    //end
    this.login = {};
    this.storage.get('email').then((value) => {
	    if(value){
		    this.login.email = value;
	    }
    })
    this.submitted = false;
  }

  onLogin(form) {
	  this.submitted = true;
	  if (form.valid) {
		  this.user.login(form.value).then((result) => {
			  this.user.hasLoggedIn().then( (value) => {
			  });
		  },(reason) => {
		  });
	  }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }

}
