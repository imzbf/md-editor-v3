import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import './index.less';

export default defineComponent({
  render() {
    return (
      <ul class="nav-list">
        <li class="nav-item">
          <RouterLink to="/">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-online"></use>
            </svg>
            首页
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/docs">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-docs"></use>
            </svg>
            文档
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/docs">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-demo"></use>
            </svg>
            示例
          </RouterLink>
        </li>
        <li class="nav-item">
          <a href="https://github.com/imzbf/md-editor-v3" target="_blank">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-github"></use>
            </svg>
            源码
          </a>
        </li>
        <li class="nav-item">
          <RouterLink to="/">
            <svg class="icon" aria-hidden="true">
              <use xlinkHref="#icon-d-about"></use>
            </svg>
            关于
          </RouterLink>
        </li>
        <li class="nav-item">
          <svg class="icon" aria-hidden="true">
            <use xlinkHref="#icon-d-en"></use>
          </svg>
          语言
        </li>
      </ul>
    );
  }
});
