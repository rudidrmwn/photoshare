export function buildPager({ page = 1, limit = 20, maxLimit = 50 } = {}) {
  page = Math.max(1, Number(page) || 1);
  limit = Math.min(maxLimit, Math.max(1, Number(limit) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
