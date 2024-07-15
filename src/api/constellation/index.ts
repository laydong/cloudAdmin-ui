import request from '/@/utils/request';
export function useConstellationApi() {
	return {
		getConstellationList: (params?: object) => {
			return request({
				url: '/constellation/list',
				method: 'get',
				params,
			});
		},
		getConstellationInfo: (params?: object) => {
			return request({
				url: '/constellation/info',
				method: 'get',
				params,
			});
		},
		ConstellationUpdate: (data?: object) => {
			return request({
				url: '/constellation/update',
				method: 'post',
				data:data,
			});
		},
		ConstellationCreate: (data?: object) => {
			return request({
				url: '/constellation/create',
				method: 'post',
				data:data,
			});
		},
		ConstellationStatus: (data?: object) => {
			return request({
				url: '/constellation/status',
				method: 'post',
				data:data,
			});
		},
		ConstellationDel: (data?: object) => {
			return request({
				url: '/constellation/del',
				method: 'post',
				data:data,
			});
		},
	};
}
