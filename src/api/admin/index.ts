import request from '/@/utils/request';
export function useAdminApi() {
	return {
		getAdminList: (params?: object) => {
			return request({
				url: '/admin/list',
				method: 'get',
				params,
			});
		},
		getAdminInfo: () => {
			return request({
				url: '/admin/info',
				method: 'get',
			});
		},
		getAdminUser: (params?:object) => {
			return request({
				url: '/admin/user',
				method: 'get',
				params
			});
		},
		AdminStatus: (data?: object) => {
			return request({
				url: '/admin/status',
				method: 'post',
				data:data,
			});
		},
		AdminUpdate: (data?: object) => {
			return request({
				url: '/admin/user_up',
				method: 'post',
				data:data,
			});
		},
		AdminCreate: (data?: object) => {
			return request({
				url: '/admin/create',
				method: 'post',
				data:data,
			});
		},
	};
}
