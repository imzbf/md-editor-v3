import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
  RouteRecordRaw
} from 'vue-router';
import NProgress from 'nprogress';
import Layout from '@/layouts/index.vue';
import { SITE_TITLE_PREFIX } from '@/config';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: '/en-US/index'
  },
  {
    path: '/:l',
    name: 'VLIndex',
    redirect: '/en-US/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'IndexPage',
        component: () => import('@/pages/Preview/index.vue'),
        meta: { title: `${SITE_TITLE_PREFIX} 编辑器展示` }
      },
      {
        path: 'docs',
        name: 'DocsPage',
        component: () => import('@/pages/Doc/index.vue'),
        meta: { title: `${SITE_TITLE_PREFIX} 文档` }
      },
      {
        path: 'demo',
        name: 'DemoPage',
        component: () => import('@/pages/Demo/index.vue'),
        meta: { title: `${SITE_TITLE_PREFIX} 代码演示` }
      },
      {
        path: 'about',
        name: 'AboutPage',
        component: () => import('@/pages/About/index.vue'),
        meta: { title: `${SITE_TITLE_PREFIX} 关于` }
      },
      {
        path: 'grammar',
        name: 'GrammarPage',
        component: () => import('@/pages/Grammar/index.vue'),
        meta: { title: `${SITE_TITLE_PREFIX} 语法` }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/md-editor-v3/'),
  routes
});

router.beforeEach(async (to: RouteLocationNormalized, _, next: NavigationGuardNext) => {
  NProgress.start();
  // document.title = to.meta.title as string;
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
