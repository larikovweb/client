export type DispatcherListener<A extends unknown[]> = (...args: A) => unknown;

export class Dispatcher<T extends Record<string, unknown[]>> {
  readonly #listeners: Map<unknown, Set<DispatcherListener<any>>> = new Map();

  public get events(): string[] {
    return [...this.#listeners.entries()].filter(([, v]) => v.size > 0).map(([k]) => `${k}`);
  }

  public off<K extends keyof T>(event: K, listener: DispatcherListener<T[K]>): void {
    this.#listeners.get(event)?.delete(listener);
    if (!this.#listeners.get(event)?.size) {
      this.#listeners.delete(event);
    }
  }

  public listen<K extends keyof T>(event: K, listener: DispatcherListener<T[K]>): () => void {
    const set = this.#listeners.get(event) ?? new Set();
    set.add(listener);

    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, set);
    }

    return (): void => {
      this.off(event, listener);
    };
  }

  public fire<K extends keyof T>(event: K, ...args: T[K]): void {
    for (const fn of this.#listeners.get(event)?.values() ?? []) {
      fn(...args);
    }
  }

  public count(): number;

  public count<K extends keyof T>(event: K): number;

  public count<K extends keyof T>(event?: K): number {
    return event
      ? this.#listeners.get(event)?.size ?? 0
      : [...this.#listeners.values()].reduce((l, r) => l + r.size, 0);
  }

  public has<K extends keyof T>(event: K): boolean {
    return this.#listeners.has(event);
  }
}
