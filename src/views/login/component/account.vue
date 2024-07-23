<template>
	<el-form size="large" class="login-content-form">
		<el-form-item class="login-animation1">
			<el-input text :placeholder="$t('message.account.accountPlaceholder1')" v-model="state.ruleForm.username" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input
				:type="state.isShowPassword ? 'text' : 'password'"
				:placeholder="$t('message.account.accountPlaceholder2')"
				v-model="state.ruleForm.password"
				autocomplete="off"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="state.isShowPassword = !state.isShowPassword"
					>
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation3">
			<el-col :span="15">
				<el-input
					text
					maxlength="4"
					:placeholder="$t('message.account.accountPlaceholder3')"
					v-model="state.ruleForm.captcha"
					clearable
					autocomplete="off"
				>
					<template #prefix>
						<el-image class="el-input__icon"><ele-Position /></el-image>
					</template>
				</el-input>
			</el-col>
			<el-col :span="1"></el-col>
			<el-col :span="8">
        <el-image class="login-content-code" @click="getCaptcha" style="padding-top: 20px;" :src="state.ruleForm.image"></el-image>
			</el-col>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round v-waves @click="onSignIn" :loading="state.loading.signIn">
				<span>{{ $t('message.account.accountBtnText') }}</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts" name="loginAccount">
import { reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';
import {useLoginApi} from "/@/api/login";
import {initBackEndControlRoutes} from "/@/router/backEnd";

// 定义变量内容
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const state = reactive({
	isShowPassword: false,
	ruleForm: {
		username: '18000521880',
		password: '123456',
    captcha_id: '',
    captcha: '',
    image: ''
	},
	loading: {
		signIn: false,
	},
});

// 时间获取
const currentTime = computed(() => {
	return formatAxis(new Date());
});

const getCaptcha = async ()=>{
  useLoginApi().getCaptcha().then((res:any)=>{
    if (res.code == 200){
      state.ruleForm.captcha_id = res.data.captcha_id
      state.ruleForm.image = res.data.image
    }else {
      ElMessage.error(res.msg);
    }
  }).catch(()=>{
    ElMessage.error(`获取验证码失败`);
    // 添加 loading，防止第一次进入界面时出现短暂空白
    NextLoading.start();
  })
}
// 登录
const onSignIn = async () => {
	state.loading.signIn = true;
  useLoginApi().signIn(state.ruleForm).then((res:any)=>{
    if (res.code == 200){
      Session.set('token', res.data.token);
      Session.set('endTime', res.data.expires_at);
      initFrontEndControlRoutes();
      signInSuccess(false);
    }else {
      ElMessage.error(res.msg);
      state.loading.signIn = false;
    }
  }).catch(()=>{
    ElMessage.error(`登录失败`);
    // 添加 loading，防止第一次进入界面时出现短暂空白
    NextLoading.start();
    state.loading.signIn = false;
  })
};
// 登录成功后的跳转
const signInSuccess = (isNoPower: boolean | undefined) => {
	if (isNoPower) {
		ElMessage.warning('抱歉，您没有登录权限');
		Session.clear();
	} else {
		// 初始化登录成功时间问候语
		let currentTimeInfo = currentTime.value;
		// 登录成功，跳到转首页
		// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
		if (route.query?.redirect) {
			router.push({
				path: <string>route.query?.redirect,
				query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
			});
		} else {
			router.push('/');
		}
		// 登录成功提示
		const signInText = t('message.signInText');
		ElMessage.success(`${currentTimeInfo}，${signInText}`);
		// 添加 loading，防止第一次进入界面时出现短暂空白
		NextLoading.start();
	}
	state.loading.signIn = false;
};

// 页面加载时
onMounted(() => {
  getCaptcha();
});
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
