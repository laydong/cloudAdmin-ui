import request from '/@/utils/request';
export function useZodiacApi() {
	return {
		getZodiacList: (params?: object) => {
			return request({
				url: '/zodiac/list',
				method: 'get',
				params,
			});
		},
		getZodiacInfo: (params?: object) => {
			return request({
				url: '/zodiac/info',
				method: 'get',
				params,
			});
		},
		ZodiacUpdate: (data?: object) => {
			return request({
				url: '/zodiac/update',
				method: 'post',
				data:data,
			});
		},
		ZodiacCreate: (data?: object) => {
			return request({
				url: '/zodiac/create',
				method: 'post',
				data:data,
			});
		},
		ZodiacStatus: (data?: object) => {
			return request({
				url: '/zodiac/status',
				method: 'post',
				data:data,
			});
		},
		ZodiacDel: (data?: object) => {
			return request({
				url: '/zodiac/del',
				method: 'post',
				data:data,
			});
		},
	};
}
