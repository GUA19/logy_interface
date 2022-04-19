<template>
  <n-config-provider :theme="theme">
    <n-card>
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
      </n-space>
      <n-grid :cols="3" :x-gap="0">
        <n-gi>
            <br>
            <br>
            <br>
            <img v-if="theme == null" src="./assets/hashwave_light_transparent.png" alt="Vue logo" height="125">
            <img v-else src="./assets/hashwave_dark_transparent.png" alt="Vue logo" height="125"/>
        </n-gi>
        <n-gi>
          <n-form 
            ref="formRef" 
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
                @update:value="handleProjectChange"
                v-model:value="formValue.application"
                :options="projectOptions"
                clearable
              />
            </n-form-item>
            <n-form-item label="Component" path="component">
              <n-select
                v-model:value="formValue.component"
                :options="collectionOptions"
                clearable
                multiple
              />
            </n-form-item>
            <n-form-item label="Instance" path="instance">
              <n-select
                v-model:value="formValue.instance"
                :options="collectionOptions"
                clearable
                multiple
              />
            </n-form-item>
            <n-form-item label="IP" path="ip">
              <n-select
                v-model:value="formValue.ip"
                :options="collectionOptions"
                clearable
                multiple
              />
            </n-form-item>
            <n-form-item label="Level" path="level">
              <n-select
                v-model:value="formValue.level"
                :options="levelOptions"
                clearable
              />
            </n-form-item>
            <n-form-item label="Number" path="number">
              <n-input-number
                :style="{ width: '600px' }"
                v-model:value="formValue.number"
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
          <n-button round type="primary">
            QUERY
          </n-button>
        </n-gi>
        <n-gi>

        </n-gi>
      </n-grid>
      <!-- <pre>{{ JSON.stringify(formValue, null, 2) }}
      </pre> -->

      <!-- <router-link :to="{ name: 'Records' }">Records</router-link>
      <n-divider vertical />
      <router-link :to="{ name: 'Swirl' }">Swirl</router-link>
      <n-divider vertical />
      <router-link :to="{ name: 'Ruapd' }">Ruapd</router-link>
      <n-divider vertical />
      <router-link :to="{ name: 'Wavefront' }">Wavefront</router-link> -->

      <!-- <n-space vertical> -->
      <!-- <n-input-group>
        <n-select
          @update:value="handleProjectChange"
          :style="{ width: '20%' }"
          v-model:value="project"
          :options="projectOptions"
          placeholder="Projects"
          clearable
        />
        <n-divider vertical />
        <n-select
          multiple
          :style="{ width: '20%' }"
          v-model:value="collection"
          :options="collectionOptions"
          placeholder="Collections"
          clearable
        />
        <n-divider vertical />
        <n-select
          :style="{ width: '10%' }"
          v-model:value="level"
          :options="levelOptions"
          placeholder="Level"
          clearable
        />
        <n-divider vertical />
        <n-input-group-label>From</n-input-group-label>
        <n-date-picker
          :style="{ width: '17.5%' }"
          v-model:value="timestamp"
          placeholder="Start Time"
          type="datetime"
          clearable
        />
        <n-input-group-label>To</n-input-group-label>
        <n-date-picker
          :style="{ width: '17.5%' }"
          v-model:value="timestamp"
          placeholder="End Time"
          type="datetime"
          clearable
        />
        <n-divider vertical />
        <n-input-number
          :style="{ width: '15%' }"
          placeholder="Number"
        />
        <n-divider vertical />
        <n-button type="primary"> Query </n-button>
      </n-input-group> -->
      <!-- </n-space> -->

      <router-view></router-view>
    </n-card>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { FormInst, darkTheme } from 'naive-ui';
  import { LightModeOutlined, DarkModeOutlined } from '@vicons/material'

  const router = useRouter();
  const formRef = ref<FormInst | null>(null)
  let theme = ref<typeof darkTheme | null>(darkTheme);
  let active = ref(true)
  // application
  // component
  // instance
  // ip
  let formValue = ref({
    application: null,
    component: null,
    instance: null,
    ip: null,
    level: null,
    number: null,
    timestamp: {
      start: null,
      end: null,
    }
  })
  // let formValue = ref({
  //   project: null,
  //   collection: null,
  //   level: null,
  //   number: null,
  //   timestamp: {
  //     start: null,
  //     end: null,
  //   },
  // });
  let projectOptions = [
    {
      label: 'Records',
      value: 'Records',
    },
    {
      label: 'Swirl',
      value: 'Swirl',
    },
    {
      label: 'Ruapd',
      value: 'Ruapd',
    },
    {
      label: 'Wavefront',
      value: 'Wavefront',
    },
  ];
  let collectionOptions = ref([]);
  let levelOptions = [
    {
      label: 'Info',
      value: 'info',
    },
    {
      label: 'Warn',
      value: 'warn',
    },
    {
      label: 'Error',
      value: 'error',
    },
  ];

  const handleProjectChange = (value: string) => {
    if (value != null) {
      router.push({
        name: value,
      });
    } else {
      router.push({
        name: 'Records',
      });
    }
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #80deea;
  /* color: #2c3e50; */
  /* margin-top: 0px; */
}
</style>
