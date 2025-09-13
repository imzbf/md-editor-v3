<script setup lang="ts">
import { useStore } from '@/store';

defineOptions({
  name: 'DocsPage',
});

const store = useStore();
const router = useRouter();

await navigateTo({
  path: `/${store.lang}/api`,
  hash: router.currentRoute.value.hash,
});
</script>
