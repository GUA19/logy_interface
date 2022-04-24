import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Records from '../views/records.vue';
import Swirl from '../views/swirl.vue';
import Ruapd from '../views/ruapd.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'records', component: Records },
  { path: '/swirl', name: 'swirl', component: Swirl },
  { path: '/ruapd', name: 'rpd', component: Ruapd },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
