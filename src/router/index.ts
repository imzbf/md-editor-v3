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
        path: 'contrast',
        name: 'ContrastPage',
        component: () => import('@/pages/Contrast/index.vue'),
        meta: { title: `${SITE_TITLE_PREFIX} 对比` }
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
