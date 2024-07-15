<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<div class="system-user-search mb15">
				<el-input v-model="state.tableData.param.name" size="default" placeholder="请输入生肖名" style="max-width: 200px"> </el-input>
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
				<el-button size="default" type="success" class="ml10" @click="onOpenAdd('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增
				</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column prop="id" label="ID" width="60" />
				<el-table-column prop="title" label="帖子标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="user_name" label="昵称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="avatar" label="头像" show-overflow-tooltip>
					<template #default="scope">
						<el-avatar shape="square" :src="scope.row.avatar" />
					</template>
				</el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip>
          <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁" @click="OpenStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
				<el-table-column prop="des" label="描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="created_at" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenEditRole('edit', scope.row)"
							>修改</el-button
						>
						<el-button size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="state.tableData.param.page"
				background
				v-model:page-size="state.tableData.param.per_page"
				layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total"
			>
			</el-pagination>
		</div>
		<Dialog ref="DialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemRole">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import {useArticleData} from "/@/api/article";
// 引入组件
const Dialog = defineAsyncComponent(() => import('/@/views/server/zodiac/dialog.vue'));

// 定义变量内容
const DialogRef = ref();
const state = reactive<SysApiState>({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
      page: 1,
      per_page: 10,
		},
    options:[{'id':0,'label':"全部"},{'id':1,'label':"启用"},{'id':2,'label':"禁用"}]
	},
});
// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
  useArticleData().getArticleList(state.tableData.param).then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data.data;
      state.tableData.total = res.data.meta.pagination.total;
    }
  })
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增角色弹窗

//搜索
const onOpenSearch = ()=>{
  state.tableData.loading = true;
  useArticleData().getArticleList(state.tableData.param).then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data.data;
      state.tableData.total = res.data.meta.pagination.total;
    }
  })
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
}

const onOpenAdd = (type: string) => {
	DialogRef.value.openDialog(type);
};
// 打开修改角色弹窗
const onOpenEditRole = (type: string, row: Object) => {
	DialogRef.value.openDialog(type, row);
};
// 删除
const onRowDel = (row: any) => {
	ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.name}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
      useArticleData().DelArticle({'id':row.id}).then((res:any)=>{
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
// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.pageNum = val;
	getTableData();
};
// 页面加载时
onMounted(() => {
	getTableData();
});

const OpenStatus = (row:any) =>{
  useArticleData().UpdateArticle(row).then((res:any)=>{
    if (res.code != 200 ) {
      ElMessage.success('更新失败');
    }
  })
}

// const onTime = (str:string,end :string) =>{
//   var dt = new Date(str)
//   var endt = new Date(end)
//   var time = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+ '---' +endt.getFullYear()+'-'+(endt.getMonth()+1)+'-'+endt.getDate()
//   return time
// }

</script>

<style scoped lang="scss">
.system-role-container {
	.system-role-padding {
		padding: 15px;
		.el-table {
			flex: 1;
		}
	}
}
</style>
