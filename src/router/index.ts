import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Records from '../views/records.vue';
import Regular from '../views/regular.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'records', component: Records },
  { path: '/regular', name: 'regular', component: Regular },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
