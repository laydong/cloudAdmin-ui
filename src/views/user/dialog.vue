<template>
	<div class="system-user-dialog-container">
		<el-dialog :title="state.dialog.title"  v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="userDialogFormRef" :model="state.ruleForm" :rules="state.rules" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户昵称">
							<el-input v-model="state.ruleForm.nickname" placeholder="请输入用户昵称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号" prop="createUser">
							<el-input v-model="state.ruleForm.mobile" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item label="头像">
              <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
              >
                <img v-if="state.ruleForm.avatar" style="width: 100px;height: 100px;" :src="state.ruleForm.avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别">
							<el-select v-model="state.ruleForm.sex" placeholder="请选择" clearable class="w100">
								<el-option label="男" :value=1></el-option>
								<el-option label="女" :value=2></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="会员等级">
							<el-select v-model="state.ruleForm.level" placeholder="请选择会员等级" clearable class="w100">
								<el-option label="大众会员" :value=1></el-option>
								<el-option label="白银会员" :value=2></el-option>
								<el-option label="黄金会员" :value=3></el-option>
								<el-option label="铂金会员" :value=4></el-option>
								<el-option label="钻石会员" :value=5></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户状态">
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
import {useUserApi} from "/@/api/user";
import {ElMessage} from "element-plus";

import type { UploadProps } from 'element-plus'

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const userDialogFormRef = ref();
const state = reactive({
	ruleForm: {
    id:0,
    nickname: '',//昵称
    avatar: '', //头像
    mobile: '',
    sex: 1,
    status: 1,
		level:1,
    describe: '',
	},
	rules:{
		nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
		mobile: { required: true, message: '请输入手机号', trigger: 'blur' },
	},
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
		useUserApi().getUserInfo({"id":row.id}).then((res:any)=>{
      if ( res.code == 200 ) {
        state.ruleForm = res.data
      }else {
        ElMessage.error(res.msg);
        return
      }
    })
		state.dialog.title = '修改用户';
		state.dialog.submitTxt = '修 改';
	} else {
		state.dialog.title = '新增用户';
		state.dialog.submitTxt = '新 增';
    state.ruleForm.id =0;
    state.ruleForm.nickname = '';
    state.ruleForm.avatar = '';
    state.ruleForm.mobile = '';
    state.ruleForm.sex = 1;
    state.ruleForm.status = 1;
    state.ruleForm.describe = '';
		userDialogFormRef.value.resetFields();
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		//
		// });
	}
	state.dialog.isShowDialog = true;

};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = () => {
	closeDialog();
	if (state.dialog.type === 'add') {
    useUserApi().UserCreate(state.ruleForm).then((res:any)=>{
      if (res.code == 200 ) {
        ElMessage.success(res.msg);
        emit('refresh');
      }else {
        ElMessage.error(res.msg);
        return
      }
    })
  }else {
    useUserApi().UserUpdate(state.ruleForm).then((res:any)=>{
      if (res.code == 200 ) {
        ElMessage.success(res.msg);
        emit('refresh');
      }else {
        ElMessage.error(res.msg);
        return
      }
    })
  }
};


// const onVerifyMobile = (val: string) => {
// 	return verifyPhone(val);
// }
//校验手机号
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  state.ruleForm.avatar = URL.createObjectURL(uploadFile.raw!)
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
  width: 178px;
  height: 178px;
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
