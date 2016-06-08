import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class UserData {
  static get parameters(){
    return [[Http],[Events]];
  }

  constructor(http, events) {
    this._favorites = [];
    this.http = http;
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.HAS_LOGGED_IN = 'hasLoggedIn';
    this.TOKEN = 'token';
    this.baseUri = "http://pmsapi.anasit.com/api";
    this.testUri = "http://192.168.1.102:80/api";
    this.examUri = "/data";
    this.headers = new Headers();
    this.headers.append('Content-Type','application/json;chatset=UTF-8');
    

/*********************************************************************
 *                      RESTful Provider 接口全局参数                      *
 *********************************************************************/
    this.conf = {};

    // 是否开启登录验证
    this.conf.AuthOn = false;

    //Uri 模式，用于区分生产环境/测试环境/本地示例
    this.conf.UriType = "exam";
  }

  getUri(route, type = this.conf.UriType){
	  
	if(type == "exam" && route.lastIndexOf("/") <= 0){
		//当测试模式时，修正资源后缀.json
	route += ".json";
	}

  	switch (type) {
  		case 'deploy':
  			return this.baseUri+route;
  			break;
  		case 'test':
  			return this.testUri+route;
  			break;
  		case 'exam':
  			return this.examUri+route;
  			break;
  		default:
  			return this.examUri+route;
  	}
  }

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName)
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(data) {
	  let route = "/auth/login";
	  let url = this.baseUri+route;
	  let body = JSON.stringify(data);
	  this.storage.set('email',data.email);

	  return new Promise((resolve,reject) => {
		  this.http.post(url, body,{
			  headers: this.headers
		  }).subscribe(res => {
			  res = res.json();
			  if (res.token){
				  this.storage.set(this.HAS_LOGGED_IN, true);
				  this.storage.set(this.TOKEN, res.token);
				  this.headers.append('Authorization','Bearer ' + res.token);
				  this.events.publish('user:login');
			  }else{
				  this.logout();
				  this.events.publish('user:nofity', res.error);
				  reject(res.error);
			  }
			  resolve(res);
		  });
	  });
  }

  signup(email, password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:signup');
  }

  logout(err="您已注销。") {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove(this.TOKEN);
    this.headers.delete('Authorization');
    this.events.publish('user:logout',err);
  }

  //return a promise
  hasLoggedIn() {
	  return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
		  if(!this.conf.AuthOn){
		  value = true;
		  }
			  return value;
	  });
  }

  //return a promise
  hasToken() {
	  return this.storage.get(this.TOKEN).then((value) => {
		  return value;
	  });
  }

}
