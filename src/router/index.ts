import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Records from '../views/records.vue';
import Swirl from '../views/swirl.vue';
import Tidal from '../views/tidal.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'records', component: Records },
  { path: '/swirl', name: 'swirl', component: Swirl },
  { path: '/tidal', name: 'tidal', component: Tidal },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
