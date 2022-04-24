<template>
	<n-config-provider :theme="theme">
		<n-card class="body">
			<n-space>
				<n-switch 
					v-model:value="active" 
					size="large" 
					@click="theme == null ? (theme = darkTheme) : (theme = null);">
					<template #checked-icon>
						<n-icon :component="DarkModeOutlined" />
					</template>
					<template #unchecked-icon>
						<n-icon :component="LightModeOutlined" />
					</template>
				</n-switch>
				<n-divider vertical />
				<n-button @click="redirect()" size="small">
					Return
				</n-button>
			</n-space>
			<n-grid :cols="2" :x-gap="0">
				<n-gi>
					<br>
					<br>
					<br>
					<img v-if="theme == null" src="./assets/hashwave_light_transparent.png" alt="Vue logo" height="125">
					<img v-else src="./assets/hashwave_dark_transparent.png" alt="Vue logo" height="125">
				</n-gi>
				<n-gi>
					<n-form
						:model="formValue" 
						label-placement="left"
						require-mark-placement="right-hanging"
						label-width="auto"
						:style="{
							maxWidth: '600px'
						}"
					>
						<n-form-item label="Application" path="application">
						<n-select
							@update:value="handleApplication"
							v-model:value="formValue.application"
							:options="applicationOptions"
							clearable
						/>
						</n-form-item>
						<n-form-item label="Component" path="component">
							<n-select
								@update:value="handleComponent"
								v-model:value="formValue.component"
								:options="componentOptions"
								clearable
							/>
						</n-form-item>
						<n-form-item label="Instance" path="instance">
							<n-select
								@update:value="handleInstance"
								v-model:value="formValue.instance"
								:options="instanceOptions"
								clearable
							/>
						</n-form-item>
						<n-form-item label="IP" path="ip">
							<n-select
								v-model:value="formValue.ip"
								:options="ipOptions"
								clearable
							/>
						</n-form-item>
						<n-form-item label="Level" path="level">
							<n-select
								v-model:value="formValue.level"
								:options="levelOptions"
								clearable
							/>
						</n-form-item>
						<n-form-item label="Limit" path="limit">
							<n-input-number
								:style="{ width: '600px' }"
								v-model:value="formValue.limit"
							/>
						</n-form-item>
						<n-form-item label="Timestamp">
							<n-grid :cols="2" :x-gap="20">
								<n-form-item-gi path="timestamp.start">
								<n-input-group-label>From</n-input-group-label>
								<n-date-picker
									v-model:value="formValue.timestamp.start"
									type="datetime"
									clearable
								/>
								</n-form-item-gi>
								<n-form-item-gi path="timestamp.start">
								<n-input-group-label>To</n-input-group-label>
									<n-date-picker
										v-model:value="formValue.timestamp.end"
										type="datetime"
										clearable
									/>
								</n-form-item-gi>
							</n-grid>
						</n-form-item>
					</n-form>
					<n-button @click="queryLogy(formValue)">
						QUERY
					</n-button>
				</n-gi>
				<n-gi>

				</n-gi>
			</n-grid>
			<router-view :recordsData="recordsData" :rpdData="rpdData" :swirlData="swirlData"></router-view>
		</n-card>
	</n-config-provider>
</template>

<script setup lang="ts">
	import GetAPI from './getApi'
	import { reactive, ref, onBeforeMount} from 'vue'
	import { useRouter } from 'vue-router';
	import { darkTheme } from 'naive-ui';
	import { LightModeOutlined, DarkModeOutlined } from '@vicons/material'

	type option = {
		label: string,
		value: string,
	};

	const router = useRouter();
	// switch
	let theme = ref<typeof darkTheme | null>(darkTheme);
	let active = ref(true)
	// form
	let formValue = reactive({
		application: <any>(null),
		component: <any>(null),
		instance: <null | string>(null),
		ip: <null | string>(null),
		level: <null | string>(null),
		limit: <null | number>(null),
		timestamp: {
			start: <null | number>(null),
			end: <null | number>(null),
		}
	})
	let options = reactive<any>({})
	let applicationOptions: Array<option> = reactive([]);
	let componentOptions: Array<option> = reactive([]);
	let instanceOptions: Array<option> = reactive([]);
	let ipOptions: Array<option> = reactive([]);
	let levelOptions: Array<option> = [
		{ label: 'info', value: 'info', },
		{ label: 'warn', value: 'warn', },
		{ label: 'error', value: 'error', },
	];
	// data table
	let recordsData:Array<any> = reactive([])
	let rpdData:Array<any> = reactive([])
	let swirlData:Array<any> = reactive([])

	const redirect = () => {
		window.location.href = 'https://wavefront.hashwave.io/dashboard';
	}

	const getOptionsDict = (list: Array<String>) => {
		let res :any = {
			option: Array<option>()
		}
		for (let i of list) {
			let splittedCollection = i.split("_")
			switch (splittedCollection.length) {
				case 1:
				res.option.push({
					label: splittedCollection[0],
					value: splittedCollection[0]
				})
				break;
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

	const handleApplication = (value: string) => {
		if (value != null) {
			// router.push({
			// 	name: value,
			// });
			componentOptions.length = 0;
			if (value != 'records') {
				componentOptions.push(...options[value]['option'])
			}
		} else {
			componentOptions.length = 0
			instanceOptions.length = 0;
			ipOptions.length = 0
			router.push({
				name: 'records',
			});
		}
		if (value != formValue.application) {
			formValue.component = null
			formValue.instance = null
			formValue.ip = null
		}
	};

	const handleComponent = (value: string) => {
		if (value != null) {
			instanceOptions.length = 0;
			instanceOptions.push(...options[formValue.application][value]['option'])
		} else {
			instanceOptions.length = 0;
			ipOptions.length = 0
		}
		if (value != formValue.component) {
			formValue.instance = null
			formValue.ip = null
		}
	}

	const handleInstance = (value: string) => {
		if (value != null) { 
			ipOptions.length = 0
			ipOptions.push(...options[formValue.application][formValue.component][value]['option'])
		} else {
			ipOptions.length = 0
		}
		if (value != formValue.instance) {
			formValue.ip = null
		}
	}

	const queryLogy = async (formValue:any) => {
		let name = new Array()
		name[0] = formValue.application
		let level = formValue.level
		let limit = formValue.limit
		let start = formValue.timestamp.start
		let end = formValue.timestamp.end
		if (formValue.application != 'records') {
			if (formValue.component != null) {
				name[0] = name[0] + '_' + formValue.component
				if (formValue.instance != null) {
					name[0] = name[0] + '_' + formValue.instance
					if (formValue.ip != null) {
						name[0] = name[0] + '_' + formValue.ip
					} else {
						let arr = new Array()
						for (let k in options[formValue.application][formValue.component][formValue.instance]) {
							if (k != 'option') {
								arr.push(formValue.application + '_' + formValue.component + '_' + formValue.instance + '_' + k)
							}
						}
						name = arr
					}
				} else {
					let arr = new Array()
					for (let j in options[formValue.application][formValue.component]) {
						if (j != 'option') {
							for (let k in options[formValue.application][formValue.component][j]) {
								if (k != 'option') {
									arr.push(formValue.application + '_' + formValue.component + '_' + j + '_' + k)
								}
							}
						}
					}
					name = arr
				}
			} else {
				let arr = new Array()
				for (let i in options[formValue.application]) {
					if (i != 'option') {
						for (let j in options[formValue.application][i]) {
							if (j != 'option') {
								for (let k in options[formValue.application][i][j]) {
									if (k != 'option') {
										arr.push(formValue.application + '_' + i + '_' + j + '_' + k)
									}
								}
							}
						}
					}
				}
				name = arr
			}
		}
		if (!level) {
			level = 'info'
		}
		if (!limit || limit < 0) {
			limit = 500
		}
		if (!start || start > Date.now()) {
			start = Date.now() - 5 * 24 * 60 * 60 * 1000
		}
		if (!end) {
			end = Date.now()
		}
		console.log(name, level, limit, start, end)
		try {
			let res = await GetAPI.getCollection(name, level, limit, start, end)
			console.log(res)
			if (res == null) {
				console.log('No document found match the query data!')
				return
			}
			switch ( formValue.application ) {
				case 'records':
					recordsData.length = 0
					for (let i of res) {
						delete i._id
						delete i.collection
						if (i.success) {
							i.success = 1
						} else {
							i.success = 0
						}
						i.ts = new Date(parseInt(i.ts.toString().slice(0,-6))).toISOString().replace('T', ' ').replace('Z', '') + ':' + i.ts.toString().slice(-6,),
						recordsData.push(i)
					}
					break;
				case 'swirl':
					swirlData.length = 0
					for (let i of res) {
						let dic = <any>{}
						dic.collection = i.collection
						dic.level = i.level
						dic.timestamp = new Date(parseInt(i.ts.toString().slice(0,-6))).toISOString().replace('T', ' ').replace('Z', '') + ':' + i.ts.toString().slice(-6,),
						dic.message = i.msg
						delete i._id
						delete i.level
						delete i.ts
						delete i.msg
						delete i.collection
						dic.obj = JSON.stringify(i)
						swirlData.push(dic)
					}
					break;
				case 'rpd':
					rpdData.length = 0
					for (let i of res) {
						let dic = <any>{}
						dic.collection = i.collection
						dic.level = i.level
						dic.timestamp = new Date(parseInt(i.ts.toString().slice(0,-6))).toISOString().replace('T', ' ').replace('Z', '') + ':' + i.ts.toString().slice(-6,),
						dic.message = i.msg
						delete i._id
						delete i.level
						delete i.ts
						delete i.msg
						delete i.collection
						dic.obj = JSON.stringify(i)
						rpdData.push(dic)
					}
					break;
				default:
					console.log('wrong collection name!')
					break;
			}	
		} catch (error) {
			console.log(error)
		}
	}

  	onBeforeMount(async () => {
		let list = []
		try {
			let res = await GetAPI.getAllCollectionNames()
			console.log(res)
			list.push(...res)
		} catch (error) {
			console.log(error)
		}
		getOptionsDict(list)
	})
</script>

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
	};
</style>
