import { LRUCache } from 'lru-cache';

export const mermaidCache = new LRUCache({
  max: 1000,
  // 缓存10分钟
  ttl: 600000
});
