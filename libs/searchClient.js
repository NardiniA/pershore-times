import MeiliSearch from "meilisearch";

export const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
  headers: {
    Authorization: `Bearer f273d7eb0ff1b2985961ac0e07c14541c696975299673ca5cc3cfc4c9697412e`,
    "Content-Type": "application/json",
  },
});