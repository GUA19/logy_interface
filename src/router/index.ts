import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Swirl from '../views/swirl.vue';
import Ruapd from '../views/ruapd.vue';
import Records from '../views/records.vue';
import Wavefront from '../views/wavefront.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Records', component: Records },
  { path: '/swirl', name: 'Swirl', component: Swirl },
  { path: '/ruapd', name: 'Ruapd', component: Ruapd },
  { path: '/wavefront', name: 'Wavefront', component: Wavefront },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
