import { RouteRecordRaw } from 'vue-router';

/**
 * 建议：路由 path 路径与文件夹名称相同，找文件可浏览器地址找，方便定位文件位置
 *
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink: 链接地址不为空 2、isIframe:false`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
 *      isAuth:         是否鉴权 1是 0否
 *      isType:         菜单类型 1菜单 2按钮
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 *      apiData[]       菜单关联api数据 url 路由 method 请求方式 service_code 服务标识
 * }
 */

// 扩展 RouteMeta 接口
declare module 'vue-router' {
	interface RouteMeta {
		title?: string;
		isLink?: string;
		isHide?: boolean;
		isKeepAlive?: boolean;
		isAffix?: boolean;
		isIframe?: boolean;
		icon?: string;
		isAuth?:number;
		isType?:number;
		apiData?:any;
	}
}

/**
 * 定义动态路由
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('/@/views/home/index.vue'),
				meta: {
					title: '首页',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					isAuth:0,
					isType:1,
					icon: 'iconfont icon-shouye',
					apiData: [
						{
							url: 'v1.user.info',
							method: 'get',
							service_code: 'cloud-api'
						}
					]
				},
			},
			{
				path: '/system',
				name: 'system',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/system/menu',
				meta: {
					title: '系统配置',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					icon: 'iconfont icon-xitongshezhi',
					isAuth: 1,
					isType: 1,
					apiData: []
				},
				children: [
					{
						path: '/system/menu',
						name: 'systemMenu',
						component: () => import('/@/views/system/menu/index.vue'),
						meta: {
							title: '菜单管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'iconfont icon-caidan',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
					{
						path: '/system/api',
						name: 'systemApi',
						component: () => import('/@/views/system/api/index.vue'),
						meta: {
							title: 'API管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'iconfont icon-caidan',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
					{
						path: '/system/role',
						name: 'systemRole',
						component: () => import('/@/views/system/role/index.vue'),
						meta: {
							title: '角色管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'ele-ColdDrink',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
					{
						path: '/system/admin',
						name: 'systemUser',
						component: () => import('/@/views/system/user/index.vue'),
						meta: {
							title: '管理员管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'iconfont icon-icon-',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
					{
						path: '/system/dept',
						name: 'systemDept',
						component: () => import('/@/views/system/dept/index.vue'),
						meta: {
							title: '部门管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'ele-OfficeBuilding',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
					{
						path: '/system/dic',
						name: 'systemDic',
						component: () => import('/@/views/system/dic/index.vue'),
						meta: {
							title: '字典管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'ele-SetUp',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
				],
			},
			{
				path: '/user',
				name: 'user',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/user/list',
				meta: {
					title: '会员管理',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					icon: 'iconfont icon-caidan',
					isAuth: 1,
					isType: 1,
					apiData: []
				},
				children: [
					{
						path: '/user/list',
						name: 'userList',
						component: () => import('/@/views/user/index.vue'),
						meta: {
							title: '会员列表',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'iconfont icon-caidan',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
				],
			},

			{
				path: '/server',
				name: 'serverIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/server/tagsView',
				meta: {
					title: '服务管理',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					icon: 'iconfont icon-crew_feature',
					isAuth: 1,
					isType: 1,
					apiData: []
				},
				children: [
					{
						path: '/server/constellation',
						name: 'serverConstellation',
						component: () => import('/@/views/server/constellation/index.vue'),
						meta: {
							title: '星座管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'ele-Pointer',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
					{
						path: '/server/zodiac',
						name: 'serverZodiac',
						component: () => import('/@/views/server/zodiac/index.vue'),
						meta: {
							title: '生肖管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'ele-Odometer',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
					{
						path: '/server/article',
						name: 'serverArticle',
						component: () => import('/@/views/server/article/index.vue'),
						meta: {
							title: '帖子管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'ele-Odometer',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
				],
			},
			{
				path: '/menu',
				name: 'menu',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/menu/menu1',
				meta: {
					title: '菜单管理',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					icon: 'iconfont icon-caidan',
					isAuth: 0,
					isType: 1,
					apiData: []
				},
				children: [
					{
						path: '/menu/menu1',
						name: 'menu1',
						component: () => import('/@/layout/routerView/parent.vue'),
						redirect: '/menu/menu1/menu11',
						meta: {
							title: '一级菜单',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'iconfont icon-caidan',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
						children: [
							{
								path: '/menu/menu1/menu11',
								name: 'menu11',
								component: () => import('/@/views/menu/menu1/menu11/index.vue'),
								meta: {
									title: '二级菜单',
									isLink: '',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									isIframe: false,
									icon: 'iconfont icon-caidan',
									isAuth: 1,
									isType: 1,
									apiData: []
								},
							},
							{
								path: '/menu/menu1/menu12',
								name: 'menu12',
								component: () => import('/@/layout/routerView/parent.vue'),
								redirect: '/menu/menu1/menu12/menu121',
								meta: {
									title: 'message.router.menu12',
									isLink: '',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									isIframe: false,
									icon: 'iconfont icon-caidan',
									isAuth: 1,
									isType: 1,
									apiData: []
								},
								children: [
									{
										path: '/menu/menu1/menu12/menu121',
										name: 'menu121',
										component: () => import('/@/views/menu/menu1/menu12/menu121/index.vue'),
										meta: {
											title: 'message.router.menu121',
											isLink: '',
											isHide: false,
											isKeepAlive: true,
											isAffix: false,
											isIframe: false,
											icon: 'iconfont icon-caidan',
											isAuth: 1,
											isType: 1,
											apiData: []
										},
									},
									{
										path: '/menu/menu1/menu12/menu122',
										name: 'menu122',
										component: () => import('/@/views/menu/menu1/menu12/menu122/index.vue'),
										meta: {
											title: 'message.router.menu122',
											isLink: '',
											isHide: false,
											isKeepAlive: true,
											isAffix: false,
											isIframe: false,
											// roles: ['admin', 'common'],
											icon: 'iconfont icon-caidan',
										},
									},
								],
							},
							{
								path: '/menu/menu1/menu13',
								name: 'menu13',
								component: () => import('/@/views/menu/menu1/menu13/index.vue'),
								meta: {
									title: 'message.router.menu13',
									isLink: '',
									isHide: false,
									isKeepAlive: true,
									isAffix: false,
									isIframe: false,
									icon: 'iconfont icon-caidan',
									isAuth: 1,
									isType: 1,
									apiData: []
								},
							},
						],
					},
					{
						path: '/menu/menu2',
						name: 'menu2',
						component: () => import('/@/views/menu/menu2/index.vue'),
						meta: {
							title: 'message.router.menu2',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'iconfont icon-caidan',
							isAuth: 1,
							isType: 1,
							apiData: []
						},
					},
				],
			},
		],
	},
];

/**
 * 定义404、401界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
			isHide: true,
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
			isHide: true,
		},
	},
];

/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	/**
	 * 提示：写在这里的为全屏界面，不建议写在这里
	 * 请写在 `dynamicRoutes` 路由数组中
	 */
	{
		path: '/visualizingDemo1',
		name: 'visualizingDemo1',
		component: () => import('/@/views/visualizing/demo1.vue'),
		meta: {
			title: 'message.router.visualizingLinkDemo1',
		},
	},
	{
		path: '/visualizingDemo2',
		name: 'visualizingDemo2',
		component: () => import('/@/views/visualizing/demo2.vue'),
		meta: {
			title: 'message.router.visualizingLinkDemo2',
		},
	},
];
