import request from '/@/utils/request';


/**
 * API管理
 * @method getArticleList 获取帖子列表
 * @method getArticleInfo 更新帖子信息
 */
export function useArticleData() {
	return {
		getArticleList: (params?: object) => {
			return request({
				url: '/article/list',
				method: 'get',
				params,
			});
		},
		getArticleInfo: (params?: object) => {
			return request({
				url: '/article/info',
				method: 'get',
				params,
			});
		},
		UpdateArticle: (params?: object) => {
			return request({
				url: '/aparticle/update',
				method: 'post',
				data:params,
			});
		},
		CreateArticle: (params?: object) => {
			return request({
				url: '/article/create',
				method: 'post',
				data:params,
			});
		},
		DelArticle: (params?: object) => {
			return request({
				url: '/article/del',
				method: 'post',
				data:params,
			});
		},
	};
}
