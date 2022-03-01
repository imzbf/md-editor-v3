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
        component: () => import('@/pages/Preview/template.vue'),
        meta: { title: `${SITE_TITLE_PREFIX} 编辑器展示` }
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
        component: () => import('@/pages/Doc'),
        meta: { title: `${SITE_TITLE_PREFIX} 文档` }
      }
    ]
  },
  {
    path: '/demo',
    name: 'Demo',
    redirect: '/demo/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'DemoIndex',
        component: () => import('@/pages/Demo'),
        meta: { title: `${SITE_TITLE_PREFIX} 代码演示` }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    redirect: '/about/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'AboutIndex',
        component: () => import('@/pages/About'),
        meta: { title: `${SITE_TITLE_PREFIX} 关于` }
      }
    ]
  },
  {
    path: '/template',
    name: 'Template',
    redirect: '/template/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'TemplateIndex',
        component: () => import('@/pages/Template/index.vue'),
        meta: { title: `${SITE_TITLE_PREFIX} 模板` }
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
  document.title = to.meta.title as string;
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
