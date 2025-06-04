const titles = {
  "/home": "Home",
  "/events": "All Events",
  "/bookings": "My Bookings",
  "/invoices": "My Invoices",
  "/logout": "Logging out"
};
// Patterns for dynamic routes, got help setting this up
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
    pattern: /^\/invoices\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    title: "Invoice Details"
  },

];

function getTitle(path) {
  if (titles[path]) {
    return titles[path];
  }

  for (const route of dynamicTitles) {
    if (route.pattern.test(path)) {
      return route.title;
    }
  }

  return " ";
}
export { getTitle };
export default titles;