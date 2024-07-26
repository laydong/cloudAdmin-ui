import request from '/@/utils/request';


/**
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 * @method getMenuAll 获取后端动态路由菜单
 * @method syncMenu 同步后端动态路由菜单
 */
export function useMenuApi() {
	return {
		syncMenu: (params?: object) => {
			return request({
				url: '/menu/sync',
				method: 'post',
				data:params,
			});
		},
		getMenuAll: () => {
			return request({
				url: '/menu/all',
				method: 'get',
			});
		},
		updateMenu: (params?: object) => {
			return request({
				url: '/menu/status',
				method: 'post',
				data:params,
			});
		},
	};
}
