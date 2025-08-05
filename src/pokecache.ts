export type CacheEntry<T> = {
  createdAt: number;
  value: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalID: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  #reap() {
    const life = Date.now() - this.#interval;
    for (const [key, value] of this.#cache) {
      if (life > value.createdAt) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    const reapIntervalID = setInterval(() => this.#reap(), this.#interval);
    this.#reapIntervalID = reapIntervalID;
  }

  stopReapLoop() {
    const reapIntervalID = this.#reapIntervalID;
    clearInterval(reapIntervalID);
    this.#reapIntervalID = undefined;
  }

  add<T>(key: string, val: CacheEntry<T>) {
    this.#cache.set(key, val);
  }

  get<T>(key: string) {
    return this.#cache.get(key);
  }
}
