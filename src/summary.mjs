export function summarize(checks) {
  const summary = { total: checks.length, passed: 0, failed: 0, unavailable: 0 };
  for (const check of checks) {
    if (check.status === "passed") {
      summary.passed += 1;
    } else if (check.status === "failed") {
      summary.failed += 1;
    } else {
      summary.unavailable += 1;
    }
  }
  return summary;
}
