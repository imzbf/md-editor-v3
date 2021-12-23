import { defineComponent, watch, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Header from './Header';
import { BackTop } from 'ant-design-vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Layout',
  setup() {
    const store = useStore();

    const changeClass = () => {
      if (store.state.theme === 'dark') {
        document.documentElement.className = 'theme-dark';
      } else {
        document.documentElement.className = '';
      }
    };

    watch(
      () => store.state.theme,
      () => {
        if (store.state.theme === 'dark') {
          document.documentElement.className = 'theme-dark';
        } else {
          document.documentElement.className = '';
        }
      }
    );

    onMounted(changeClass);

    return () => (
      <div class={['docs-page']}>
        <Header />
        <RouterView />
        <BackTop>UP</BackTop>
      </div>
    );
  }
});
