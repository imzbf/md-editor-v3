import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Header from './Header';
import { BackTop } from 'ant-design-vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Layout',
  setup() {
    const store = useStore();

    return () => (
      <div class={['docs-page', store.state.theme === 'dark' && 'theme-dark']}>
        <Header />
        <RouterView />
        <BackTop>UP</BackTop>
      </div>
    );
  }
});
