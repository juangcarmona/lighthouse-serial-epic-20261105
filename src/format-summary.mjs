export function formatSummary(summary) {
  return `${summary.total} checks: ${summary.passed} passed, ${summary.failed} failed, ${summary.unavailable} unavailable`;
}
