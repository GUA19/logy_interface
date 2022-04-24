<template>
  <div class="records">
    <h2>Records Raw Data</h2>
    <n-data-table 
      striped
      :columns="columns" 
      :data="recordsData" 
      :pagination="pagination"
      :style="{ height: `${1226}px` }"
      flex-height
    />
  </div>
</template>

<script setup lang="ts">

const columns: Array<any> = [
  { title: 'Collection Name', key: 'coll_name', width: 286  },
  { 
    title: 'Timestamp', 
    key: 'ts',
    width: 232, 
    sorter: (row1: { timestamp: number; }, row2: { timestamp: number; }) => row1.timestamp - row2.timestamp, 
    render(row: { ts: number }) {
      return new Date(parseInt(row.ts.toString().slice(0,-6))).toISOString().replace('T', ' ').replace('Z', '') + ':' + row.ts.toString().slice(-6,)
    },
  },
  { title: 'Submit Type', key: 'submit_type', width: 102 },
  { title: 'Success', key: 'success', width: 77 },
  { title: 'Error Message', key: 'err_msg', width: 116 },
  { title: 'Count', key: 'count', width: 80 },
];

const pagination = {
  pageSize: 30
}

type Props = {
  recordsData: [],
}

defineProps<Props>()
</script>
