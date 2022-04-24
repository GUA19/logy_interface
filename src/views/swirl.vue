<template>
  <div class="swirl">
    <h2>Swirl Raw Data</h2>
    <n-data-table 
      :columns="columns" 
      :data="swirlData" 
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
  { title: 'Collection', key: 'collection' },
  { title: 'Level', key: 'level' },
  { title: 'Timestamp', key: 'timestamp' },
  { title: 'Message', key: 'message' },
  { title: 'Object', key: 'obj' },
];

const pagination = {
  pageSize: 30
}

type Props = {
  swirlData: [],
}

defineProps<Props>()
</script>
