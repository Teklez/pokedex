import { cleanInput } from "./src/repl";
import { expect, describe, test } from "vitest";
import { Cache, CacheEntry } from "./src/pokecache.js";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: " my name is marshal",
    expected: ["my", "name", "is", "marshal"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);
  const entry: CacheEntry<string> = {
    createdAt: Date.now(),
    value: val,
  };
  cache.add(key, entry);
  const cached = cache.get(key);
  expect(cached).toBe(entry);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});
