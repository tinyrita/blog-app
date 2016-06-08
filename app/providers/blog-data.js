import {Injectable} from 'angular2/core';
import {UserData} from './user-data';
import {Http, Headers} from 'angular2/http';

/*
  Generated class for the BlogData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BlogData {
  static get parameters(){
    return [[Http],[UserData]]
  }  

  constructor(http,user) {
    this.http = http;
    this.user = user;
    this.data = null;
  }

  load() {
	  let route = "/blog";
		  let url = this.user.getUri(route);

    if (this.data) {
      // already loaded data
      // 需要同时判断本地数据是否最新
      //return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise((resolve,reject) => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url,{
	      headers: this.user.headers
      }).subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
	  //console.log(data.json());
          this.data = data.json();
          resolve(this.data);
        });
    });
  }

  getList(){
	  console.log('getBlog');
	  return this.load().then(data => {
		  return data;
	  });
  }
  getById(id) {
	  let blog = {};

		  let p1 = this.restGet("/blog/"+id);
		  //let p2 = this.restGet("/blog/"+id);
		  //let p4 = this.restGet("/blog/get_task/"+id);

		  return Promise.all([p1]).then( data => {
		  blog = data[0];
		  console.log("then");
		  blog.author = "袁淼";
		  console.log(blog);
		  console.log("then");
		  //blog.task = data[3];
		  return blog;
		  });

  }

  restGet(route){
	  let url = this.user.getUri(route);

	  return new Promise((resolve,reject) => {
	  this.http.get(url,{
		  headers: this.user.headers
	  }).subscribe(data => {
		  if(data.json().status == "400"){
			  this.user.logout();
			  reject("授权已超时，请重新登陆。");
		  }
			  console.log("resolved the restGet");
			  console.log(data.json());
			  resolve(data.json());
	  });


	  });

  }

}

