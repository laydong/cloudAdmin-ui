import request from '/@/utils/request';
export function useAdminApi() {
	return {
		getAdminList: (params?: object) => {
			return request({
				url: '/name/list',
				method: 'get',
				params,
			});
		},
		getAdminInfo: () => {
			return request({
				url: '/name/info',
				method: 'get',
			});
		},
		getAdminUser: (params?:object) => {
			return request({
				url: '/name/user',
				method: 'get',
				params
			});
		},
		AdminStatus: (data?: object) => {
			return request({
				url: '/name/status',
				method: 'post',
				data:data,
			});
		},
		AdminUpdate: (data?: object) => {
			return request({
				url: '/name/save',
				method: 'post',
				data:data,
			});
		},
		AdminCreate: (data?: object) => {
			return request({
				url: '/name/add',
				method: 'post',
				data:data,
			});
		},
	};
}
