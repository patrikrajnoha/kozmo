/**
 * vyhladavanie produktov podla nazvu
 * @param {Array} items - zoznam poloziek (produkty alebo udalosti)
 * @param {String} query - hladany text
 * @returns {Array} - vyfiltrovane polozky
 */
export function searchItems(items, query) {
  if (!query) return items;
  return items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}

/**
 * filter podla kat.
 * @param {Array} items 
 * @param {String} category - nazov kategorie
 * @returns {Array} - vyfiltr. polozky
 */
export function filterByCategory(items, category) {
  if (category === "Všetko") return items;
  return items.filter((item) => item.category === category);
}

/**
 * triedenie podla datumu a pod.
 * @param {Array} items - 
 * @param {String} sortBy - kluc triedenia
 * @param {Boolean} ascending - radenie VZOSTUPNE (hore)
 * @returns {Array} - zoradene polozky
 */
export function sortItems(items, sortBy, ascending = true) {
  const sorted = [...items].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date) - new Date(b.date);
    }
   
    return 0;
  });
  return ascending ? sorted : sorted.reverse();
}
