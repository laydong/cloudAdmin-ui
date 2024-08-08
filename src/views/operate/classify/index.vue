<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
      <div class="system-user-search mb15">
        <el-button size="default" type="success" class="ml10" @click="onOpenAddClassify('add',0)">
          <el-icon>
            <ele-FolderAdd />
          </el-icon>
          新增分类
        </el-button>
      </div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="id" label="ID" ></el-table-column>
        <el-table-column prop="title" label="分类名称" ></el-table-column>
        <el-table-column prop="alias" label="分类别名" ></el-table-column>
        <el-table-column prop="level" label="等级" ></el-table-column>
        <el-table-column label="图标" >
          <template #default="scope">
            <el-avatar shape="square" :size="40" :src="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" ></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch v-if="scope.row.id ===1" :disabled="true" v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁"></el-switch>
            <el-switch v-else v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁"  v-if="scope.row.id !==1" @click="OpenStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="100">
          <template  #default="scope" >
            <el-button v-if="scope.row.level < 3" size="small" text type="primary" @click="onOpenAddClassify('add', scope.row.id)">添加子分类</el-button>
            <el-button size="small" text type="primary" @click="onOpenEditClassify('edit', scope.row)">修改</el-button>
            <el-button v-if="scope.row.children === null" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
			</el-table>
		</el-card>
		<ClassifyDialog ref="ClassifyDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemRole">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import {ElMessage, ElMessageBox} from "element-plus";
import {useClassify} from "/@/api/classify";
// 引入组件
const ClassifyDialog = defineAsyncComponent(() => import('/src/views/operate/classify/dialog.vue'));
const ClassifyDialogRef = ref();
const state = reactive({
	tableData: {
    data: [],
    total: 0,
    loading: false,
	},
});
// 获取角色数据
const getTableData = () => {
	state.tableData.loading = true;
  useClassify().getClassifyAll().then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data;
    }
  })
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};
const onOpenAddClassify = (type: string, pid: number) => {
  ClassifyDialogRef.value.openDialog(type,pid);
};
// 打开修改分类弹窗
const onOpenEditClassify = (type: string, row: Object) => {
  ClassifyDialogRef.value.openDialog(type, row);
};

const OpenStatus = (row:any) =>{
  useClassify().saveClassify(row).then((res:any)=>{
    if (res.code != 200 ) {
      ElMessage.success('更新失败');
    }
  })
}
// 删除
const onRowDel = (row:any) => {
  ElMessageBox.confirm(`此操作将永久删除分类：“${row.title}”，是否继续?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        useClassify().closeClassify({'id':row.id}).then((res:any)=>{
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
