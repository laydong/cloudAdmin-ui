import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import {useAdminApi} from "/@/api/admin";

export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfo: {
			id:0,
			username:'',
			nickname:'',
			avatar:'',
			sex:1,
			mobile:'',
			status:1,
			login_time:'',
			login_ip:'',
			time: 0,
			user_role:'管理员',
			describe:'',
			email:'',
			user_menu:[],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			Session.remove('userInfo')
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfo = Session.get('userInfo');
				return
			}

			if (this.userInfo.id == 0) {
				return new Promise((resolve) => {
						setTimeout(() => {
							useAdminApi().getAdminInfo().then((res: any)=>{
								if (res.code == 200 ) {
									this.userInfo.id = res.data.id
									this.userInfo.avatar = res.data.avatar
									this.userInfo.nickname = res.data.nickname
									this.userInfo.username = res.data.username
									this.userInfo.sex = res.data.sex
									this.userInfo.mobile = res.data.mobile
									this.userInfo.status = res.data.status
									this.userInfo.login_ip = res.data.login_ip
									this.userInfo.login_time = res.data.login_time
									this.userInfo.describe = res.data.describe
									this.userInfo.email = res.data.email
									this.userInfo.user_menu = res.data.user_menu
									this.userInfo.user_role = res.data.user_role
								}
							})
							// // admin 按钮权限标识
							let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
							this.userInfo.time = new Date().getTime()
							this.userInfo.authBtnList = adminAuthBtnList
							Session.set('userInfo',this.userInfo)
							return
						})
				})
			}
		},
		async getApiUserInfo() {
			this.userInfo = Session.get('userInfo');
			return this.userInfo
		},
	},
});
