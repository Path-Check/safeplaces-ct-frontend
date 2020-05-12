"use strict";

///////////////////////////////////////
// Customization!
///////////////////////////////////////
var has_backend = true; // When true use standard back API calls

var BACKEND_ROOT = "https://api.express.safeplaces.extremesolution.com"; // Specify Backend ROOT if API endpoints not hosted on same domain

var logo = ""; // Enter a logo for backend

var logo_text = ""; // Enter name or second graphic

var logo_destination_url = ""; // show modal dialogue if no MAPS_API_KEY specified
// Comment out line if MAP_API_KEY hardcoded

var MAP_API_KEY = localStorage.getItem("MAP_API_KEY"); // var MAP_API_KEY = "<Enter API key here>";

var TZ_STRING = moment.tz.guess(true);
var DATE_FORMAT = "D-MMM-Y h:mma z";
var AJAX_OPTIONS = {
  contentType: "application/json; charset=utf-8"
};