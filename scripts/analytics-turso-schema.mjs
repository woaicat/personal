import schema from "../lib/private-analytics/schema.json" with { type: "json" };

// Explicit initializer only; never imports demo data or clears existing records.
export async function initializeAnalyticsSchema(
  client,
  { requireEmptyViews = false } = {},
) {
  const tx = await client.transaction("write");
  try {
    const tables = (
      await tx.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
      )
    ).rows;
    const hasMetadata = tables.some((row) => row.name === "analytics_schema");
    const version = hasMetadata
      ? Number(
          (await tx.execute("SELECT version FROM analytics_schema WHERE id=1"))
            .rows[0]?.version,
        )
      : 0;
    if (version !== 0 && version !== schema.version)
      throw new Error("Unsupported schema");
    if (version === 0 && tables.length)
      throw new Error("Requires an empty dedicated database");
    if (
      requireEmptyViews &&
      version !== 0 &&
      Number(
        (await tx.execute("SELECT COUNT(*) AS n FROM views")).rows[0]?.n,
      ) !== 0
    )
      throw new Error("Production preparation requires no existing views");
    await tx.batch([
      ...schema.statements,
      {
        sql: "INSERT INTO analytics_schema(id,version) VALUES(1,?) ON CONFLICT(id) DO UPDATE SET version=excluded.version",
        args: [schema.version],
      },
    ]);
    await tx.commit();
  } catch (error) {
    try {
      await tx.rollback();
    } catch {
      /* Preserve the original failure. */
    }
    throw error;
  } finally {
    tx.close();
  }
  const results = await client.batch(
    [
      "SELECT version FROM analytics_schema WHERE id=1",
      "SELECT COUNT(*) AS n FROM views",
    ],
    "read",
  );
  return {
    version: Number(results[0].rows[0]?.version),
    pv: Number(results[1].rows[0]?.n),
  };
}
