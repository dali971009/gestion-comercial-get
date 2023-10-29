import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import beforeEachGuards from './guards/index';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

beforeEachGuards.forEach(guard => router.beforeEach(guard));

export default router;
