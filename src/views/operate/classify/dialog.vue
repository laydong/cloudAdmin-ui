<template>
	<div class="system-user-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="userDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item label="上级分类">
              <el-select v-model="state.ruleForm.pid" placeholder="请选择状态">
                <el-option
                    v-for="item in state.levelData"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="分类名称">
							<el-input v-model="state.ruleForm.title" placeholder="请输入分类名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="别名">
							<el-input v-model="state.ruleForm.alias" placeholder="请输入别名" clearable></el-input>
						</el-form-item>
					</el-col>
          <el-col :xs="12" :sm="18" :md="18" :lg="18" :xl="18" class="mb20">
            <el-form-item label="图标">
              <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                <img v-if="state.ruleForm.icon" :src="state.ruleForm.icon" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态">
							<el-switch v-model="state.ruleForm.status" :active-value="1" :inactive-value="2"  inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="用户描述">
							<el-input v-model="state.ruleForm.describe" type="textarea" placeholder="请输入用户描述" maxlength="150"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemUserDialog">
import { reactive, ref } from 'vue';
import {ElMessage} from "element-plus";
import type { UploadProps } from 'element-plus'
import {useClassify} from "/@/api/classify";
import jsPlumb from "jsplumb";
import isArray = jsPlumb.jsPlumbUtil.isArray;

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const userDialogFormRef = ref();
const state = reactive({
	ruleForm: {
    id:0,
    title: '', //分类名
    alias: '',//别名
    pid:0,//上级ID
    level: 0, //等级
    status: 1,
    icon: '',//图标
    sort: 99,
    describe: '',
	},
  roleData:[],
	levelData: [] as ClassifTreeType[], // 部门数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 打开弹窗
const openDialog = (type: string, row: RowUserType) => {
  state.dialog.type = type
	if (type === 'edit') {
    useClassify().getClassifyInfo({"id":row.id}).then((res:any)=>{
      if ( res.code == 200 ) {
        state.ruleForm = res.data
      }else {
        ElMessage.error(res.msg);
        return
      }
    })
		state.dialog.title = '编辑分类';
		state.dialog.submitTxt = '修 改';
	} else {
		state.dialog.title = '新增分类';
		state.dialog.submitTxt = '新 增';
    state.ruleForm.id =0;
    state.ruleForm.title = '';
    state.ruleForm.alias = '';
    state.ruleForm.pid = 0;
    state.ruleForm.level = 1;
    state.ruleForm.status = 1;
    state.ruleForm.sort = 99;
    state.ruleForm.icon = '';
    state.ruleForm.describe = '';
	}
	state.dialog.isShowDialog = true;
  getLevelData();
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

//获取上级分类
const getLevelData = () =>{
  useClassify().getClassifyAll().then((res:any)=>{
    if ( res.code == 200 ) {
      for (let i = 0; i < res.data.length; i++) {

        console.log(res.data[i].describe);
      }
      // for ()
      state.levelData = res.data
    }else {
      ElMessage.error(res.msg);
      return
    }
  })
}

// 提交
const onSubmit = () => {
  useClassify().saveClassify(state.ruleForm).then((res:any)=>{
    if (res.code == 200 ) {
      closeDialog();
      ElMessage.success(res.msg);
      emit('refresh');
    }else {
      ElMessage.error(res.msg);
      return
    }
  })
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  state.ruleForm.icon = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

// 暴露变量
defineExpose({
	openDialog,
});
</script>


<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
