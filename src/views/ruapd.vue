<script setup lang="ts">

const columns: Array<any> = [
  { title: 'Collection', key: 'collection', width: 200 },
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
  { title: 'Message', key: 'message', width: 168 },
  { title: 'Object', key: 'obj' },
];

const pagination = {
  pageSize: 24
}

type Props = {
  rpdData: [],
}

defineProps<Props>()
</script>

<template>
  <div class="ruapd">
    <n-data-table striped :columns="columns" :data="rpdData" :pagination="pagination" :style="{ 'height': '1226px' }"
      flex-height />
  </div>
</template>