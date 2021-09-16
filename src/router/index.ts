import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
  RouteRecordRaw
} from 'vue-router';
import NProgress from 'nprogress';
import Layout from '@/layouts';
import { SITE_TITLE_PREFIX } from '@/config';

const VITE_BASE = import.meta.env.VITE_BASE;

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'IndexPage',
        component: () => import('@/pages/Preview'),
        meta: { title: `${SITE_TITLE_PREFIX} 实例预览` }
      }
    ]
  },
  {
    path: '/docs',
    name: 'Docs',
    redirect: '/docs/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'DocsIndex',
        component: () => import('@/pages/Doc')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(VITE_BASE as string),
  routes
});

router.beforeEach(async (to: RouteLocationNormalized, _, next: NavigationGuardNext) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
