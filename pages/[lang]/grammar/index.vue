<script setup lang="ts">
import { useStore } from '@/store';

defineOptions({
  name: 'GrammarPage',
});

const store = useStore();
const router = useRouter();

await navigateTo({
  path: `/${store.lang}/syntax`,
  hash: router.currentRoute.value.hash,
});
</script>
