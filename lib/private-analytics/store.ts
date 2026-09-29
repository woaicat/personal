import { createHash } from "node:crypto";
import { createClient } from "@libsql/client/web";
import { analyticsConfig, tursoConnection } from "./config";
import { SqliteAnalyticsRepository } from "./sqlite";
import { TursoAnalyticsRepository } from "./turso";
import type { AnalyticsRepository } from "./repository";

const state = globalThis as typeof globalThis & {
  privateAnalyticsStoreV2?: {
    key: string;
    ready: Promise<AnalyticsRepository>;
    close: () => void;
  };
};
// Lazy: builds and public pages do not require a database connection.
export async function analyticsRepository(): Promise<AnalyticsRepository> {
  const config = analyticsConfig();
  const connection = config.storage === "turso" ? tursoConnection() : null;
  const key = createHash("sha256")
    .update(JSON.stringify(connection || { file: config.file }))
    .digest("hex");
  if (state.privateAnalyticsStoreV2?.key !== key) {
    state.privateAnalyticsStoreV2?.close();
    const repo = connection
      ? new TursoAnalyticsRepository(
          createClient({ ...connection, intMode: "number" }),
        )
      : new SqliteAnalyticsRepository(config.file);
    const ready = connection
      ? (repo as TursoAnalyticsRepository).verifySchema().then(() => repo)
      : Promise.resolve(repo);
    const entry = { key, ready, close: () => repo.close() };
    state.privateAnalyticsStoreV2 = entry;
    ready.catch(() => {
      if (state.privateAnalyticsStoreV2 === entry) {
        entry.close();
        state.privateAnalyticsStoreV2 = undefined;
      }
    });
  }
  return state.privateAnalyticsStoreV2!.ready;
}
