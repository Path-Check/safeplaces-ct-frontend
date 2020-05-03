///////////////////////////////////////
// Customization!
///////////////////////////////////////

var has_backend = false; // When true use standard back API calls
const BACKEND_ROOT = ""; // Specify Backend ROOT if API endpoints not hosted on same domain
var logo = ""; // Enter a logo for backend
var logo_text = ""; // Enter name or second graphic
var logo_destination_url = "";

// show modal dialogue if no MAPS_API_KEY specified
// Comment out line if MAP_API_KEY hardcoded
var MAP_API_KEY = localStorage.getItem("MAP_API_KEY");
// var MAP_API_KEY = "<Enter API key here>";

const TZ_STRING = moment.tz.guess(true);
const DATE_FORMAT = "D-MMM-Y h:mma z";

AJAX_OPTIONS = { contentType: "application/json; charset=utf-8" };

DEBUG_BACKEND = false;
DEBUG_BACKEND_API_KEY = "";
