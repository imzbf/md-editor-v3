interface CacheOptions {
  max: number;
  ttl: number;
}

interface CacheEntry<V> {
  expiresAt: number;
  value: V;
}

class TtlLruCache<K, V> {
  private readonly cache = new Map<K, CacheEntry<V>>();

  constructor(private readonly options: CacheOptions) {}

  private isExpired(entry: CacheEntry<V>) {
    return entry.expiresAt <= Date.now();
  }

  private deleteExpired(key: K, entry?: CacheEntry<V>) {
    const target = entry ?? this.cache.get(key);

    if (!target || !this.isExpired(target)) {
      return false;
    }

    this.cache.delete(key);
    return true;
  }

  private trim() {
    for (const [key, entry] of this.cache) {
      if (!this.deleteExpired(key, entry)) {
        break;
      }
    }

    while (this.cache.size > this.options.max) {
      const oldestKey = this.cache.keys().next().value;

      if (oldestKey === undefined) {
        break;
      }

      this.cache.delete(oldestKey);
    }
  }

  get(key: K) {
    const entry = this.cache.get(key);

    if (!entry || this.deleteExpired(key, entry)) {
      return undefined;
    }

    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.value;
  }

  set(key: K, value: V) {
    this.cache.delete(key);
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + this.options.ttl
    });
    this.trim();
  }

  clear() {
    this.cache.clear();
  }
}

export const mermaidCache = new TtlLruCache<string, string>({
  max: 1000,
  // 缓存10分钟
  ttl: 600000
});
