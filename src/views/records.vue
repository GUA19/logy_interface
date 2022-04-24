<template>
  <div class="records">
    <h2>Records Raw Data</h2>
    <n-data-table 
      :columns="columns" 
      :data="recordsData" 
      :pagination="pagination"
    />
  </div>
</template>

<script setup lang="ts">

type header = {
  title: string;
  key: string;
};

const columns: Array<header> = [
  { title: 'Collection Name', key: 'coll_name' },
  { title: 'Timestamp', key: 'ts' },
  { title: 'Submit Type', key: 'submit_type' },
  { title: 'Success', key: 'success' },
  { title: 'Error Message', key: 'err_msg' },
  { title: 'Count', key: 'count' },
];

const pagination = {
  pageSize: 30
}

type Props = {
  recordsData: [],
}

defineProps<Props>()
</script>
