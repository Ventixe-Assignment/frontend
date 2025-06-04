const titles = {
  "/home": "Home",
  "/events": "All Events",
  "/bookings": "My Bookings",
  "/invoices": "My Invoices",
  "/logout": "Logging out"
};
// Patterns for dynamic routes
const dynamicTitles = [
  {
    pattern: /^\/events\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, 
    title: "Event Details"
  },
  {
    pattern: /^\/bookings\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    title: "Booking Details"
  },
  {
    pattern: /^\/invoice\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    title: "Invoice Details"
  },

];
/**
 * Get title based on the current path.
 * @param {string} path
 * @returns {string} title
 */
function getTitle(path) {
  if (titles[path]) {
    return titles[path];
  }
  // Check dynamic patterns
  for (const route of dynamicTitles) {
    if (route.pattern.test(path)) {
      return route.title;
    }
  }
  // Default title if no match
  return " ";
}
export { getTitle };
export default titles;