import request from '/@/utils/request';


/**
 * 角色管理
 * @method getRoleList 获取角色列表
 * @method UpdateRole 更新角色信息
 */
export function useRole() {
	return {
		getRoleList: (params?: object) => {
			return request({
				url: '/role/list',
				method: 'get',
				params,
			});
		},
		getRoleListAll: () => {
			return request({
				url: '/role/all',
				method: 'get',
			});
		},
		getRoleInfo: (params?: object) => {
			return request({
				url: '/role/info',
				method: 'get',
				params,
			});
		},
		getRoleAll: () => {
			return request({
				url: '/role/all',
				method: 'get',
			});
		},
		UpdateRole: (params?: object) => {
			return request({
				url: '/role/save',
				method: 'post',
				data:params,
			});
		},
		Available: () => {
			return request({
				url: '/role/available',
				method: 'get',
			});
		},
		DelRole: (params?: object) => {
			return request({
				url: '/role/del',
				method: 'post',
				data:params,
			});
		},
	};
}
