import request from '/@/utils/request';


/**
 * API管理
 * @method getArticleList 获取帖子列表
 * @method getArticleInfo 更新帖子信息
 */
export function useClassify() {
	return {
		getClassifyList: (params?: object) => {
			return request({
				url: '/classify/list',
				method: 'get',
				params,
			});
		},
		getClassifyInfo: (params?: object) => {
			return request({
				url: '/classify/info',
				method: 'get',
				params,
			});
		},
		saveClassify: (params?: object) => {
			return request({
				url: '/classify/save',
				method: 'post',
				data:params,
			});
		},
		closeClassify: (params?: object) => {
			return request({
				url: '/classify/close',
				method: 'post',
				data:params,
			});
		},
	};
}
