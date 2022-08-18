<script setup lang="ts">
import { NDataTable } from 'naive-ui';
const columns: Array<any> = [
  { title: 'Collection', key: 'collection', width: 286 },
  { title: 'Level', key: 'level', width: 58 },
  {
    title: 'Timestamp',
    key: 'timestamp',
    width: 232,
    sorter: (row1: { timestamp: number; }, row2: { timestamp: number; }) => row1.timestamp - row2.timestamp,
    render(row: { timestamp: number }) {
      return new Date(parseInt(row.timestamp.toString().slice(0, -6))).toISOString().replace('T', ' ').replace('Z', '') + ':' + row.timestamp.toString().slice(-6,)
    },
  },
  { title: 'Message', key: 'message', width: 320 },
  { title: 'Object', key: 'obj' },
];

const pagination = {
  pageSize: 24
}

type Props = {
  swirlData: [],
}

defineProps<Props>()
</script>

<template>
  <div class="swirl">
    <n-data-table striped :columns="columns" :data="swirlData" :pagination="pagination" :style="{ 'height': '1226px' }"
      flex-height />
  </div>
</template>