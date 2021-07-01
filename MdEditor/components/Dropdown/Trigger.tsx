import { getSlot } from '../../utils/vue-tsx';
import { defineComponent } from 'vue';

export default defineComponent({
  render() {
    return getSlot({ instance: this });
  }
});
