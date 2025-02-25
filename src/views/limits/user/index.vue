<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
      <div class="system-user-search mb15">
        <el-input v-model="state.tableData.param.nickname" size="default" placeholder="请输入用户昵称" style="max-width: 200px"> </el-input>
        <el-select v-model="state.tableData.param.status" size="default" class="ml10" placeholder="请选择状态">
          <el-option
              v-for="item in state.tableData.options"
              :key="item.id"
              :label="item.label"
              :value="item.id"
          />
        </el-select>
        <el-button size="default" type="primary" class="ml10" @click="onOpenSearch()">
          <el-icon>
            <ele-Search />
          </el-icon>
          查询
        </el-button>
        <el-button size="default" type="success" class="ml10" @click="onOpenAddUser('add')">
          <el-icon>
            <ele-FolderAdd />
          </el-icon>
          新增用户
        </el-button>
      </div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column type="index" label="序号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="username" label="账户名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nickname" label="用户昵称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sex" label="头像" show-overflow-tooltip>
          <template #default="scope">
            <el-avatar shape="square" :size="100" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.sex">男</el-tag>
            <el-tag type="info" v-else>女</el-tag>
          </template>
        </el-table-column>
				<el-table-column prop="mobile" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="user_role" label="角色" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip>
          <template #default="scope">
            <el-switch v-if="scope.row.id === 1" :disabled="scope.row.id === 1" v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁"></el-switch>
            <el-switch v-else v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁" @click="OpenStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
				<el-table-column prop="describe" label="用户描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="created_at" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenEditUser('edit', scope.row)"
							>修改</el-button
						>
						<el-button v-if="scope.row.id !== 1" :disabled="scope.row.id === 1" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="state.tableData.param.currentPage"
				background
				v-model:page-size="state.tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total"
			>
			</el-pagination>
		</el-card>
		<UserDialog ref="userDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import {useAdminApi} from "/@/api/admin";

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/src/views/limits/user/dialog.vue'));
// 定义变量内容
const userDialogRef = ref();
const state = reactive({
	tableData: {
		data: [],
		total: 0,
		loading: false,
    options:[{'id':0,'label':"全部"},{'id':1,'label':"启用"},{'id':2,'label':"禁用"}],
		param: {
      status:1,
      sex:0,
      nickname:'',
      currentPage: 1,
      pageSize: 10,
		},
	},
});

// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
  useAdminApi().getAdminList(state.tableData.param).then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data.data;
      state.tableData.total = state.tableData.data.length;
    }
  })
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增用户弹窗
const onOpenAddUser = (type: string) => {
	userDialogRef.value.openDialog(type);
};
// 打开修改用户弹窗
const onOpenEditUser = (type: string, row: RowUserType) => {
	userDialogRef.value.openDialog(type, row);
};

const delUser = () => {
  state.tableData.loading = true;
  useAdminApi().getAdminList(state.tableData.param).then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data.data;
      state.tableData.total = state.tableData.data.length;
    }
  })
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};
// 删除用户
const onRowDel = (row: RowUserType) => {
	ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.username}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
      useAdminApi().AdminClose({'ids':[row.id]}).then((res:any)=>{
        if (res.code != 200 ) {
          ElMessage.error(res.msg);
        }else {
          getTableData();
          ElMessage.success('删除成功');
        }
      })
		})
		.catch(() => {});
};
// 分页改变

const onOpenSearch = ()=>{
  state.tableData.loading = true;
  useAdminApi().getAdminList(state.tableData.param).then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data.data;
      state.tableData.total = state.tableData.data.length;
    }
  })
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
}
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.currentPage = val;
	getTableData();
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style scoped lang="scss">
.system-user-container {
	:deep(.el-card__body) {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;
		.el-table {
			flex: 1;
		}
	}
}
</style>
