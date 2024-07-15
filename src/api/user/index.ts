import request from '/@/utils/request';
export function useUserApi() {
	return {
		getUserList: (params?: object) => {
			return request({
				url: '/user/list',
				method: 'get',
				params,
			});
		},
		getUserInfo: (params?: object) => {
			return request({
				url: '/user/info',
				method: 'get',
				params,
			});
		},
		UserStatus: (data?: object) => {
			return request({
				url: '/user/status',
				method: 'post',
				data:data,
			});
		},
		UserUpdate: (data?: object) => {
			return request({
				url: '/user/update',
				method: 'post',
				data:data,
			});
		},
		UserCreate: (data?: object) => {
			return request({
				url: '/user/create',
				method: 'post',
				data:data,
			});
		},
	};
}
