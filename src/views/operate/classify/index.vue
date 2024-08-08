<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
      <div class="system-user-search mb15">
        <el-button size="default" type="success" class="ml10" @click="onOpenAddRole('add',0)">
          <el-icon>
            <ele-FolderAdd />
          </el-icon>
          新增分类
        </el-button>
      </div>

      <template>
        <el-table :data="tableData" style="width: 100%">
          <!-- 其他列 -->
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <!-- 这里的iconClass是图标的类名，可以根据实际需求动态绑定 -->
              <i :class="iconClass" style="margin-right: 5px;"></i>
              <!-- 其他操作按钮或链接 -->
            </template>
          </el-table-column>
        </el-table>
      </template>


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
            <el-button v-if="scope.row.id !== 1 && scope.row.pid === 1" size="small" text type="primary" @click="onOpenAddRole('add', scope.row.id)">添加子分类</el-button>
            <el-button v-if="scope.row.id !== 1" size="small" text type="primary" @click="onOpenEditRole('edit', scope.row)">修改</el-button>
            <el-button v-if="scope.row.id !== 1" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
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
import {useClassify} from "/@/api/classify";
// 引入组件
const RoleDialog = defineAsyncComponent(() => import('/src/views/limits/role/dialog.vue'));
const roleDialogRef = ref();
const state = reactive({
	tableData: {
    data: [],
    total: 0,
    loading: false,
    options:[{'id':0,'label':"全部"},{'id':1,'label':"启用"},{'id':2,'label':"禁用"}],
    param: {
      title:'',
      alias:'',
      status:0,
      created_at:'',
      currentPage: 1,
      pageSize: 10,
    },
	},
});
// 获取角色数据
const getTableData = () => {
	state.tableData.loading = true;
  useClassify().getClassifyList(state.tableData.param).then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data.data;
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
  useClassify().saveClassify(row).then((res:any)=>{
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
