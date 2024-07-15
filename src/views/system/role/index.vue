<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
      <div class="system-user-search mb15">
        <el-button size="default" type="success" class="ml10" @click="onOpenAddRole('add',0)">
          <el-icon>
            <ele-FolderAdd />
          </el-icon>
          新增角色
        </el-button>
      </div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="name" label="角色名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sort" label="排序" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="角色状态" show-overflow-tooltip>
          <template #default="scope">
            <el-switch :disabled="scope.row.id === 1" v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁" @click="OpenStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="describe" label="角色描述" show-overflow-tooltip></el-table-column>
        <el-table-column prop="created_at" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template  #default="scope" >
            <el-button :disabled="scope.row.id === 1" size="small" text type="primary" @click="onOpenAddRole('add', scope.row.id)">添加子角色</el-button>
            <el-button :disabled="scope.row.id === 1" size="small" text type="primary" @click="onOpenEditRole('edit', scope.row)">修改</el-button>
            <el-button :disabled="scope.row.id === 1" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
			</el-table>
		</el-card>
		<RoleDialog ref="roleDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemRole">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import {ElMessage, ElMessageBox} from "element-plus";
import {useRole} from "/@/api/role";
// 引入组件
const RoleDialog = defineAsyncComponent(() => import('/@/views/system/role/dialog.vue'));
const roleDialogRef = ref();
const state = reactive<SysRoleState>({
	tableData: {
		data: [],
		loading: true,
	},
});
// 获取角色数据
const getTableData = () => {
	state.tableData.loading = true;
  useRole().getRoleListAll().then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data;
    }
  })
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};
const onOpenAddRole = (type: string, pid: number) => {
  roleDialogRef.value.openDialog(type,pid);
};
// 打开修改角色弹窗
const onOpenEditRole = (type: string, row: Object) => {
  roleDialogRef.value.openDialog(type, row);
};

const OpenStatus = (row:any) =>{
  useRole().UpdateRole(row).then((res:any)=>{
    if (res.code != 200 ) {
      ElMessage.success('更新失败');
    }
  })
}
// 删除角色
const onRowDel = (row: RowRoleType) => {
  ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.name}”，是否继续?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        useRole().DelRole({'id':row.id}).then((res:any)=>{
          if (res.code == 200 ) {
            getTableData();
            ElMessage.success('删除成功');
          }else {
            ElMessage.error('删除失败');
          }
        })
      })
      .catch(() => {});
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
