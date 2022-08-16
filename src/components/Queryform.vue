<script setup lang="ts">
import { useLoadingBar, useMessage } from 'naive-ui';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import GetAPI from '../getApi';

type option = {
    label: string,
    value: string,
};

type props = {
    applicationOptions: option[],
    options: any
}

let data = defineProps<props>()
const emit = defineEmits(['query']);

const loadingBar = useLoadingBar()
const message = useMessage()
const router = useRouter();
let componentOptions: Array<option> = reactive([]);
let instanceOptions: Array<option> = reactive([]);
let ipOptions: Array<option> = reactive([]);
let disableQueryButton = ref(false);

let formValue = reactive({
    application: null as any,
    component: null as any,
    instance: null as null | string,
    ip: null as null | string,
    limit: null as null | number,
    query: ref([]),
    sort: ref([]),
    queryPreset: ref([]),
    sortPreset: ref([]),
})

let queryPresetOptions = [
    {
        label: 'Info & Warn & Error',
        value: '{}',
    },
    {
        label: 'Info Only',
        value: '{"level":"info"}',
    },
    {
        label: 'Warn & Error',
        value: '{"$or": [{"level":"warn"},{"level":"error"}]}',
    },
    {
        label: 'Warn Only',
        value: '{"level":"warn"}',
    },
    {
        label: 'Error',
        value: '{"level":"error"}',
    },
    {
        label: 'Error Only',
        value: '{"level":"error"}',
    },
    {
        label: 'Last 1 hour',
        value: `{"ts":{"$gte":${(Date.now() - 1000 * 60 * 60).toString()}000000}}`,
    },
    {
        label: 'Last 6 hours',
        value: `{"ts":{"$gte":${(Date.now() - 1000 * 60 * 60 * 6).toString()}000000}}`,
    },
    {
        label: 'Last 12 hours',
        value: `{"ts":{"$gte":${(Date.now() - 1000 * 60 * 60 * 12).toString()}000000}}`,
    },
    {
        label: 'Last 24 hours',
        value: `{"ts":{"$gte":${(Date.now() - 1000 * 60 * 60 * 24).toString()}000000}}`,
    },
]

let sortPresetOptions = [
    {
        label: 'tsDescending',
        value: '{"ts":-1}',
    },
    {
        label: 'tsAscending',
        value: '{"ts":1}',
    },
]

Array.from({ length: 100 }).map((v, i) => ({
    label: 'Option ' + i,
    value: i,
    // disabled: i % 5 === 0
}))

let logydata: Array<any> = reactive([])

function handleApplication(value: string) {
    if (value != null) {
        router.push({
            name: value,
        });
        componentOptions.length = 0;
        if (value != 'records') {
            componentOptions.push(...data.options[value]['option'])
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

function handleComponent(value: string) {
    if (value != null) {
        instanceOptions.length = 0;
        instanceOptions.push(...data.options[formValue.application][value]['option'])
    } else {
        instanceOptions.length = 0;
        ipOptions.length = 0
    }
    if (value != formValue.component) {
        formValue.instance = null
        formValue.ip = null
    }
}

function handleInstance(value: string) {
    if (value != null) {
        ipOptions.length = 0
        ipOptions.push(...data.options[formValue.application][formValue.component][value]['option'])
    } else {
        ipOptions.length = 0
    }
    if (value != formValue.instance) {
        formValue.ip = null
    }
}

async function queryLogy(formValue: any) {
    disableQueryButton.value = true
    loadingBar.start()
    let name = new Array()
    name[0] = formValue.application
    logydata.length = 0
    let limit = formValue.limit
    let query = {} as any
    let sort = {} as any
    try {
        for (let i of formValue.query) {
            if (i != "" && i != "{}") {
                let obj = JSON.parse(i)
                for (let key in obj) {
                    query[key] = obj[key]
                }
            }
        }
        for (let j of formValue.queryPreset) {
            if (j != "" && j != "{}") {
                let obj = JSON.parse(j)
                for (let key in obj) {
                    query[key] = obj[key]
                }
            }
        }
        for (let k of formValue.sort) {
            if (k != "" && k != "{}") {
                let obj = JSON.parse(k)
                for (let key in obj) {
                    sort[key] = obj[key]
                }
            }
        }
        for (let l of formValue.sortPreset) {
            if (l != "" && l != "{}") {
                let obj = JSON.parse(l)
                for (let key in obj) {
                    sort[key] = obj[key]
                }
            }
        }
    } catch (error) {
        // console.log("Please check your input")
        disableQueryButton.value = false
        loadingBar.error()
        message.error("Please check your input")
        return
    }
    if (formValue.application != 'records') {
        if (formValue.component != null) {
            name[0] = name[0] + '_' + formValue.component
            if (formValue.instance != null) {
                name[0] = name[0] + '_' + formValue.instance
                if (formValue.ip != null) {
                    name[0] = name[0] + '_' + formValue.ip
                } else {
                    let arr = new Array()
                    for (let k in data.options[formValue.application][formValue.component][formValue.instance]) {
                        if (k != 'option') {
                            arr.push(formValue.application + '_' + formValue.component + '_' + formValue.instance + '_' + k)
                        }
                    }
                    name = arr
                }
            } else {
                let arr = new Array()
                for (let j in data.options[formValue.application][formValue.component]) {
                    if (j != 'option') {
                        for (let k in data.options[formValue.application][formValue.component][j]) {
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
            for (let i in data.options[formValue.application]) {
                if (i != 'option') {
                    for (let j in data.options[formValue.application][i]) {
                        if (j != 'option') {
                            for (let k in data.options[formValue.application][i][j]) {
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
    if (!limit || limit < 0) {
        limit = 500
    }
    console.log(name, limit, JSON.stringify(query), JSON.stringify(sort))
    for (let n of name) {
        try {
            let res = await GetAPI.getLogs(n, JSON.stringify(query), JSON.stringify(sort), limit)
            console.log(res)
            if (res == null) {
                console.log('No document found match the query data!', n)
                continue
            }
            switch (formValue.application) {
                case 'records':
                    for (let i of res) {
                        delete i._id
                        if (i.success) {
                            i.success = 1
                        } else {
                            i.success = 0
                        }
                        // i.ts = new Date(parseInt(i.ts.toString().slice(0,-6))).toISOString().replace('T', ' ').replace('Z', '') + ':' + i.ts.toString().slice(-6,),
                        logydata.push(i)
                    }
                    break;
                case 'swirl':
                    for (let i of res) {
                        let dic = {} as any
                        dic.collection = n
                        dic.level = i.level
                        dic.timestamp = i.ts
                        // dic.timestamp = new Date(parseInt(i.ts.toString().slice(0,-6))).toISOString().replace('T', ' ').replace('Z', '') + ':' + i.ts.toString().slice(-6,),
                        dic.message = i.msg
                        delete i.level
                        delete i._id
                        delete i.ts
                        delete i.msg
                        dic.obj = JSON.stringify(i)
                        logydata.push(dic)
                    }
                    break;
                case 'rpd':
                    for (let i of res) {
                        let dic = {} as any
                        dic.collection = n
                        dic.level = i.level
                        dic.timestamp = i.ts
                        // dic.timestamp = new Date(parseInt(i.ts.toString().slice(0,-6))).toISOString().replace('T', ' ').replace('Z', '') + ':' + i.ts.toString().slice(-6,),
                        dic.message = i.msg
                        delete i.level
                        delete i._id
                        delete i.ts
                        delete i.msg
                        dic.obj = JSON.stringify(i)
                        logydata.push(dic)
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
    disableQueryButton.value = false
    if (logydata.length == 0) {
        loadingBar.error()
        message.error('No document found match the query data!')
        return
    } else {
        loadingBar.finish()
        message.info("Query Success!")
        emit('query', {
            application: formValue.application,
            data: logydata,
        })
    }
}
</script>

<template>
    <n-form :model="formValue" label-placement="left" require-mark-placement="right-hanging" label-width="auto">
        <n-form-item label="Application" path="application">
            <n-select @update:value="handleApplication" v-model:value="formValue.application"
                :options="applicationOptions" clearable />
        </n-form-item>
        <n-form-item label="Component" path="component">
            <n-select @update:value="handleComponent" v-model:value="formValue.component" :options="componentOptions"
                clearable />
        </n-form-item>
        <n-form-item label="Instance" path="instance">
            <n-select @update:value="handleInstance" v-model:value="formValue.instance" :options="instanceOptions"
                clearable />
        </n-form-item>
        <n-form-item label="IP" path="ip">
            <n-select v-model:value="formValue.ip" :options="ipOptions" clearable />
        </n-form-item>
        <n-grid :span="24" :x-gap="10">
            <n-form-item-gi span="12" label="Query" path="query">
                <n-dynamic-input v-model:value="formValue.query" placeholder="Please type query here" :min="0"
                    :max="10" />
            </n-form-item-gi>
            <n-form-item-gi span="12" label="Sort" path="sort">
                <n-dynamic-input v-model:value="formValue.sort" placeholder="Please type sort here" :min="0"
                    :max="10" />
            </n-form-item-gi>
            <n-form-item-gi span="12" label="Query Presets" path="queryPreset">
                <n-transfer v-model:value="formValue.queryPreset" size="small" source-title=" " target-title=" "
                    :options="queryPresetOptions" />
            </n-form-item-gi>
            <n-form-item-gi span="12" label="Sort Presets" path="sortPreset">
                <n-transfer v-model:value="formValue.sortPreset" size="small" source-title=" " target-title=" "
                    :options="sortPresetOptions" />
            </n-form-item-gi>
        </n-grid>
        <n-form-item label="Limit" path="limit">
            <n-input-number v-model:value="formValue.limit" placeholder="500" />
        </n-form-item>
        <n-button @click="queryLogy(formValue)" :disabled="disableQueryButton">
            QUERY
        </n-button>
    </n-form>
</template>