<script setup lang="ts">
import { useStore } from '@/store';

const store = useStore();
const router = useRouter();

await navigateTo({
  path: `/${store.lang}/syntax`,
  hash: router.currentRoute.value.hash,
});
</script>
