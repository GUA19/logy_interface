<template>
  <div class="wavefront">
    <h2>Wavefront Raw Data</h2>
    <n-data-table :columns="columns" :data="data" />
    <h2>Wavefront Processed Data</h2>
    <n-data-table :columns="columns" :data="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

type header = {
  title: string;
  key: string;
};

type tableItem = {
  name: string;
  age: number;
  address: string;
  tags: string;
  actions: string;
};

const columns: Array<header> = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  { title: 'Address', key: 'address' },
  { title: 'Tags', key: 'tags' },
  { title: 'Action', key: 'actions' },
];

let data: Array<tableItem> = [];

export default defineComponent({
  data() {
    return {
      data: ref(data),
      columns,
    };
  },
});
</script>
