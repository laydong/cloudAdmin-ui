<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
			<div class="system-menu-search mb15">
        <el-button size="default" type="primary" class="ml10" @click="onOpenSyncMenu">同步菜单</el-button>
			</div>
			<el-table
				:data="state.tableData.data"
				v-loading="state.tableData.loading"
				style="width: 100%"
				row-key="id"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
        <el-table-column prop="label" label="菜单名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="number" label="菜单编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="url" label="路由" show-overflow-tooltip></el-table-column>
        <el-table-column label="是否权限菜单" show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.is_auth==1">鉴权</el-tag>
            <el-tag type="info" v-else>公共</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="菜单类型" show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.type==1">菜单</el-tag>
            <el-tag type="success" v-else>按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="菜单状态" show-overflow-tooltip>
          <template #default="scope">
            <el-switch :disabled="scope.row.id === 1" v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁" @click="OpenStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
			</el-table>
		</el-card>
		<MenuDialog ref="menuDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemMenu">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRoutesList } from '/src/stores/routesList';
import {useMenuApi} from "/src/api/menu";
// 引入组件
const MenuDialog = defineAsyncComponent(() => import('/src/views/system/menu/dialog.vue'));

// 定义变量内容
const stores = useRoutesList();
const {routesAll} = storeToRefs(stores);
const menuDialogRef = ref();
const state = reactive({
	tableData: {
		data: [] as RouteRecordRaw[],
		loading: true,
	},
});

// 获取路由数据，真实请从接口获取
const getTableData = () => {
	state.tableData.loading = true;
  useMenuApi().getMenuAll().then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data;
    }
  })
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};

//更新菜单状态
const OpenStatus = (row:any) =>{
  useMenuApi().statusMenu(row).then((res:any)=>{
    if (res.code != 200 ) {
      ElMessage.success('更新失败');
    }
  })
}
//同步菜单
const onOpenSyncMenu = () => {
  useMenuApi().syncMenu({'data':routesAll.value}).then((res:any)=>{
    if (res.code == 200 ) {
      ElMessage.success(res.msg);
      getTableData()
    }else {
      ElMessage.error(res.msg);
    }
  })
}
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
