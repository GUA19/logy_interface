<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from 'vue';
import { darkTheme, NConfigProvider, NCard, NPageHeader, NDivider, NSpace, NSwitch, NButton, NIcon, NLoadingBarProvider, NMessageProvider } from 'naive-ui';
import { useRouter } from 'vue-router';
import { LightModeOutlined, DarkModeOutlined } from '@vicons/material';
import GetAPI from './getApi';
import QueryForm from './components/Queryform.vue';
import { useAuth0 } from '@auth0/auth0-vue';
const { loginWithRedirect, logout, getAccessTokenSilently, user, isAuthenticated } = useAuth0();

type StringToDict = { [key: string]: any }

type option = {
	label: string,
	value: string,
};

const router = useRouter();
// switch
let theme = ref<typeof darkTheme | null>(darkTheme);
let active = ref(true)

// form
let options = reactive<any>({})
let applicationOptions: Array<option> = reactive([]);

// data table
let recordsData: Array<any> = reactive([])
let regularData: StringToDict = reactive({})
let selectedApplication = ref('records')

function redirect() {
	window.location.href = 'https://wavefront.codehard.xyz';
}

function getOptionsDict(list: Array<String>) {
	let res: any = {
		option: Array<option>()
	}
	for (let i of list) {
		let splittedCollection = i.split("_")
		switch (splittedCollection.length) {
			// records collection
			case 1:
				res.option.push({
					label: splittedCollection[0],
					value: splittedCollection[0]
				})
				break;
			// normal logy collections
			case 4:
				if (!res[splittedCollection[0]]) {
					res[splittedCollection[0]] = {
						option: new Array()
					}
					res.option.push({
						label: splittedCollection[0],
						value: splittedCollection[0]
					})
				}
				if (!res[splittedCollection[0]][splittedCollection[1]]) {
					res[splittedCollection[0]][splittedCollection[1]] = {
						option: new Array()
					}
					res[splittedCollection[0]].option.push({
						label: splittedCollection[1],
						value: splittedCollection[1]
					})
				}
				if (!res[splittedCollection[0]][splittedCollection[1]][splittedCollection[2]]) {
					res[splittedCollection[0]][splittedCollection[1]][splittedCollection[2]] = {
						option: new Array()
					}
					res[splittedCollection[0]][splittedCollection[1]].option.push({
						label: splittedCollection[2],
						value: splittedCollection[2]
					})
				}
				if (!res[splittedCollection[0]][splittedCollection[1]][splittedCollection[2]][splittedCollection[3]]) {
					res[splittedCollection[0]][splittedCollection[1]][splittedCollection[2]][splittedCollection[3]] = true
					res[splittedCollection[0]][splittedCollection[1]][splittedCollection[2]].option.push({
						label: splittedCollection[3],
						value: splittedCollection[3]
					})
				}
				break;
		}
	}
	applicationOptions.push(...res.option)
	for (let j in res) {
		options[j] = res[j]
	}
}

function handleQueryEvent(data: any) {
	switch (data.application) {
		case 'records':
			recordsData.length = 0
			recordsData.push(...data.data)
			break;
		default:
			regularData[data.application] = []
			regularData[data.application].push(...data.data)
			break;
	}
}

function handleChangeApplication(data: any) {
	selectedApplication.value = data.application
}

function Login() {
	loginWithRedirect();
}

function Logout() {
	logout({ returnTo: window.location.origin });
}

onBeforeMount(async () => {
	try {
		const token = await getAccessTokenSilently();
		let res: Array<string> = await GetAPI.getAllCollectionNames(token)
		console.log(res)
		getOptionsDict(res)
	} catch (error) {
		console.log(error)
	}
})
</script>

<template>
	<n-config-provider :theme="theme">
		<n-card class="body" :bordered="false">
			<n-page-header subtitle="">
				<n-divider></n-divider>
				<template #title>
					<div style="margin-left: -10px; margin-bottom: -10px">
						LOGY
					</div>
				</template>
				<template #avatar>
					<img v-if="theme == null" src="./assets/hashwave_light_transparent.png" alt="Vue logo" height="45">
					<img v-else src="./assets/hashwave_dark_transparent.png" alt="Vue logo" height="45">
				</template>
				<template #extra>
					<n-space>
						<n-switch v-model:value="active" size="large"
							@click="theme == null ? (theme = darkTheme) : (theme = null);">
							<template #checked-icon>
								<n-icon :component="DarkModeOutlined" />
							</template>
							<template #unchecked-icon>
								<n-icon :component="LightModeOutlined" />
							</template>
						</n-switch>
						<n-divider vertical />
						<n-button size="small" v-if="isAuthenticated" @click="Logout">Log out {{
							typeof user.nickname == "string" ? (user.nickname.length > 9 ? user.nickname.slice(0, 5) + "..." +
							user.nickname?.slice(-4) : user.nickname.slice(0, 1).toUpperCase() + user.nickname.slice(1)) : ""
							}}
						</n-button>
						<n-button size="small" v-else @click="Login">Log in</n-button>
					</n-space>
				</template>
			</n-page-header>
			<n-loading-bar-provider>
				<n-message-provider>
					<QueryForm @query="handleQueryEvent" @changeApplication="handleChangeApplication" :options=options
						:applicationOptions=applicationOptions />
				</n-message-provider>
			</n-loading-bar-provider>
			<br>
			<router-view :recordsData="recordsData" :regularData="regularData" :application="selectedApplication">
			</router-view>
		</n-card>
	</n-config-provider>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	/* color: #80deea; */
	/* color: #2c3e50; */
	margin-top: 0px;
	margin-bottom: 0px;
	background-color: coral;
}
</style>