type Sortable = { completionDate?: string | null; createdAt: Date | string };

/**
 * Newest completion date first. Projects without a completion date are
 * treated as ongoing and listed first. Ties fall back to newest added.
 * Dates come from <input type="date"> (YYYY-MM-DD), so they compare as text.
 */
export function sortByCompletion<T extends Sortable>(projects: T[]): T[] {
  return [...projects].sort((a, b) => {
    const da = a.completionDate || "9999";
    const db = b.completionDate || "9999";
    if (da !== db) return db.localeCompare(da);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
