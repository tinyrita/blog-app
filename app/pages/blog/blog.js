import {Page, Modal, Alert, Toast, NavController} from 'ionic-angular';
import {Events} from 'ionic-angular';
import {BlogAddPage} from './blog-add';
import {UserData} from '../../providers/user-data';
import {BlogData} from '../../providers/blog-data';
import {BlogDetailPage} from './blog-detail'

@Page({
	templateUrl: 'build/pages/blog/blog.html',
})
export class BlogPage {
	static get parameters() {
		return [[NavController],[BlogData],[UserData],[Events]];
	}

	constructor(nav, blogData, user, events) {
		this.nav = nav;
		//this.segment = "me";
		this.blogData = blogData;
		this.user = user;
		this.events = events;
		this.groups = {};

		this.update();
	}

	doRefresh(refresher){
		this.update();

		setTimeout(() => {
			refresher.complete();
		},2000);
	}

	update(){
		this.blogData.getList().then((data) => {
			this.blogs = data;
			console.log("update");
			console.log(this.blogs);
		});

	}

	showBlogDetail(p){
		this.blogData.getById(p.id).then((data) => {
			this.nav.push(BlogDetailPage,data);
		},(err) => {
			this.events.publish('user:notify',err);
		});

	}

	presentToast(msg){
		let toast = Toast.create({
			message: msg, 
			duration:1000
		});

		//this.nav.present(toast);
	}

	presentAdd() {
		let data = {
			title:"参加亚太CIO领袖峰会",
			date:"5-30",
			onwer:"刘雨飏",
			todolist:[
				"准备火车票",
				"查看会议地点",
				"安排住宿"
			]};
		let modal = Modal.create(BlogAddPage, data);

		this.nav.present(modal);

		modal.onDismiss(data => {
			if(data){
				console.log(data);
			}
		})
	}


}
