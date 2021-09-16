import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Header from './Header';

export default defineComponent({
  name: 'Layout',
  render() {
    return (
      <>
        <Header />
        <RouterView />
      </>
    );
  }
});
