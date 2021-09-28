import { computed, defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import './index.less';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    const linkNames = computed(() => {
      return store.state.lang === 'cn'
        ? {
            home: '首页',
            docs: '文档',
            demo: '示例',
            github: '源码',
            about: '关于',
            lang: 'English',
            langIcon: '#icon-d-en'
          }
        : {
            home: 'Home',
            docs: 'Docs',
            demo: 'Demo',
            github: 'Github',
            about: 'About',
            lang: '中文',
            langIcon: '#icon-d-cn'
          };
    });

    return () => (
      <ul class="nav-list">
        <li class="nav-item">
          <RouterLink to="/">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-online"></use>
            </svg>
            {linkNames.value.home}
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/docs">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-docs"></use>
            </svg>
            {linkNames.value.docs}
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/demo">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-demo"></use>
            </svg>
            {linkNames.value.demo}
          </RouterLink>
        </li>
        <li class="nav-item">
          <a href="https://github.com/imzbf/md-editor-v3" target="_blank">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-github"></use>
            </svg>
            {linkNames.value.github}
          </a>
        </li>
        <li class="nav-item">
          <RouterLink to="/about">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-about"></use>
            </svg>
            {linkNames.value.about}
          </RouterLink>
        </li>
        <li
          class="nav-item"
          onClick={() => {
            store.commit('changeLang');
          }}
        >
          <svg class="icon" aria-hidden="true">
            <use xlinkHref={linkNames.value.langIcon}></use>
          </svg>
          {linkNames.value.lang}
        </li>
      </ul>
    );
  }
});
