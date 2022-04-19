<template>
  <div class="records">
    <h2>Records Raw Data</h2>
    <n-data-table :columns="columns" :data="data" />
    <h2>Records Processed Data</h2>
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
  _id: string;
  coll_name: string;
  ts: string;
  submit_type: number;
  success: boolean;
  err_msg: string;
  count: number;
  collection: string;
};

const columns: Array<header> = [
  { title: 'ID', key: '_id' },
  { title: 'Collection Name', key: 'coll_name' },
  { title: 'Timestamp', key: 'ts' },
  { title: 'Submit Type', key: 'submit_type' },
  { title: 'Success', key: 'success' },
  { title: 'Error Message', key: 'err_msg' },
  { title: 'Count', key: 'count' },
  { title: 'Collection', key: 'collection' },
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
