export function summarize(checks) {
  return { total: checks.length, passed: checks.filter(check => check.status === "passed").length };
}
