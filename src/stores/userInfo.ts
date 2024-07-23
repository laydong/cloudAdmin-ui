import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import {useAdminApi} from "/@/api/admin";
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfo: {
			id : 0,
			username : '',
			nickname:'',
			avatar:'',
			sex :0,
			mobile:'',
			status:0,
			login_ip:'',
			login_time :'',
			user_menu:[],
			user_role:'',
			describe:'',
			email:'',
			roles: [],
			authBtnList: [],
			time: 0,
		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfo = Session.get('userInfo');
			} else {
				this.userInfo = <UserInfo>await this.getApiUserInfo();
			}
		},
		async getApiUserInfo() {
			return new Promise((resolve) => {
				setTimeout(() => {
					var userInfo = this.userInfo
						useAdminApi().getAdminInfo().then((res: any) => {
							if (res.code == 200) {
								userInfo.id = res.data.id;
								userInfo.username = res.data.username;
								userInfo.nickname = res.data.nickname;
								userInfo.avatar = res.data.avatar;
								userInfo.sex = res.data.sex;
								userInfo.mobile = res.data.mobile;
								userInfo.status = res.data.status;
								userInfo.login_ip = res.data.login_ip;
								userInfo.login_time = res.data.login_time;
								userInfo.user_menu = res.data.user_menu;
								userInfo.user_role = res.data.user_role;
								userInfo.describe = res.data.describe;
								userInfo.email = res.data.email;
								let adminRoles: Array<string> = ['admin'];
								// admin 按钮权限标识
								let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
								userInfo.roles = adminRoles
								userInfo.authBtnList = adminAuthBtnList
								console.log(userInfo)
								Session.set('userInfo', userInfo);
								resolve(userInfo);
							}
						})
				}, 0);
			});
		},
	},
});
