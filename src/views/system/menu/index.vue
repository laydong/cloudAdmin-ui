<template>
  <div class="system-menu-container layout-pd">
    <el-card shadow="hover">
      <el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="title" width="220" label="菜单名称"></el-table-column>
        <el-table-column prop="number" label="菜单标识"></el-table-column>
        <el-table-column prop="type" label="菜单类型" show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.sex">男</el-tag>
            <el-tag type="info" v-else>女</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="type" label="菜单类型"></el-table-column>

        <el-table-column prop="sort" label="排序" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="菜单启用状态" show-overflow-tooltip>
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
import {useMenuApi} from "/@/api/menu";
import {RouteRecordRaw} from "vue-router";
// 引入组件
const RoleDialog = defineAsyncComponent(() => import('/@/views/system/role/dialog.vue'));
const roleDialogRef = ref();
const state = reactive({
  tableData: {
    data: [],
    loading: true,
  },
});
// 获取角色数据
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

//更新状态
const OpenStatus = (row:any) =>{
  useMenuApi().updateMenu(row).then((res:any)=>{
    if (res.code != 200 ) {
      ElMessage.success('更新失败');
    }
  })
}
// 页面加载时
onMounted(() => {
  getTableData();
});
</script>
