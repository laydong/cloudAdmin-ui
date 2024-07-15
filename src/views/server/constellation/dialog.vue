<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="roleDialogFormRef" :model="state.constellationForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="星座">
							<el-input v-model="state.constellationForm.name" placeholder="请输入星座名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="10" :sm="24" :md="24" :lg="24" :xl="10" class="mb20">
						<el-form-item label="图标">
							<el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="state.constellationForm.icon" style="width: 100px;height: 100px;" :src="state.constellationForm.icon" class="avatar" />
								<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
							</el-upload>
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="时间区间">
							<el-date-picker
									v-model="state.time_range"
									type="daterange"
									range-separator="至"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
							/>
            </el-form-item>
          </el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态">
							<el-switch v-model="state.constellationForm.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="描述">
							<el-input v-model="state.constellationForm.des" type="textarea" placeholder="请输入描述" maxlength="150"></el-input>
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

<script setup lang="ts" name="systemApiDialog">
import { reactive, ref } from 'vue';
import {ElMessage, UploadProps} from 'element-plus';
import {useConstellationApi} from "/@/api/constellation";
import moment from "moment";
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);
// 定义变量内容
const roleDialogFormRef = ref();
const state = reactive({
	constellationForm: {
    id :0,
    name: '',
		icon:'',
		start_date:'',
		end_date:'',
		attribute:'',
		des: '',
		tag: '',
    status: 1,
		male_des:'',
		girl_des:'',
		colour: '',
	},
	time_range:['',''],
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 打开弹窗
const openDialog = (type: string, row: any) => {
  state.dialog.type = type
	if (type === 'edit') {
    state.constellationForm = row
    state.dialog.title = '修改角色';
    state.dialog.submitTxt = '修 改';
		state.time_range = []
    state.time_range.push(moment(state.constellationForm.start_date).format('YYYY-MM-DD'))
    state.time_range.push(moment(state.constellationForm.end_date).format('YYYY-MM-DD'))
	} else {
		state.dialog.title = '新增角色';
		state.dialog.submitTxt = '新 增';
    const str = moment(new Date()).format('YYYY-MM-DD')
		state.time_range = []
		state.time_range.push(str)
		state.time_range.push(str)
    state.constellationForm.id = 0
    state.constellationForm.name = ''
    state.constellationForm.icon = ''
    state.constellationForm.status = 1
    state.constellationForm.des =''
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
	if (state.time_range.length < 2){
		ElMessage.error('请选择时间');
		return
	}
	state.constellationForm.start_date = state.time_range[0]
	state.constellationForm.end_date = state.time_range[1]
	if (state.dialog.type === 'add') {
		useConstellationApi().ConstellationCreate(state.constellationForm).then((res:any)=>{
      if ( res.code == 200 ) {
        ElMessage.success(res.msg);
        emit('refresh');
      }else {
        ElMessage.error(res.msg);
      }
    })
  }else {
		useConstellationApi().ConstellationUpdate(state.constellationForm).then((res:any)=>{
      if ( res.code == 200 ) {
        ElMessage.success(res.msg);
        emit('refresh');
      }else {
        ElMessage.error(res.msg);
      }
    })
  }
};
const handleAvatarSuccess: UploadProps['onSuccess'] = (
		response,
		uploadFile
) => {
	state.constellationForm.icon = URL.createObjectURL(uploadFile.raw!)
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

<style scoped lang="scss">
.system-role-dialog-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
