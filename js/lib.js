// constants

const MARKER_ICONS = {
    DEFAULT: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569", //RED
    GROUP: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|855dfd", //PURPLE
    SELECTED: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|34ba46", //GREEN
    RECURRING: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e661ac", //PINK
    TRANSIENT: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff9900", //ORANGE
    TRAVEL: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fdf569", //YELLOW
};

const GROUP_TYPES = {
    UNDEF: "undefined",
    RECURRING: "recurring",
    TRANSIENT: "transient",
    TRAVEL: "travel",
};

const MARKER_ZINDEX = {
    DEFAULT: 0, //ideally would have liked to use google.maps.Marker.MAX_ZINDEX, but it library isn't initalized when this tries to load
    SELECTED: 4, //selected marker is always on top
    GROUP: 3, //followed by others in its selected group
    TRANSIENT: 2, //transients are higher priority than recurring (???)
    RECURRING: 1, //
    TRAVEL: 0, //travel should always be on the bottom
};

///////////////////////////////////////
// logging support

function HHMMSSmmm() {
    var now = new Date();
    var ms = "000" + now.getMilliseconds();
    return now.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + "." + ms.substr(ms.length - 3);
}

function isInitalized(parameter) {
    return isDefined(parameter) && parameter != null;
}

function isDefined(parameter) {
    return !(typeof parameter === "undefined");
}

function LOG(str) {
    if (!(typeof str === "string" || str instanceof String)) str = JSON.stringify(str);

    console.log(HHMMSSmmm() + " - " + str + "\n");
}

function doLogout() {
    localStorage.setItem("token", null);
    localStorage.setItem("MAP_API_KEY", null);
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    location.reload();
}

function onLogoClick() {
    window.open(logo_destination_url);
}

function initDrawing() {
    drawingManager = new google.maps.drawing.DrawingManager();
    drawingManager.setDrawingMode(null);
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, "rectanglecomplete", function (rectangle) {
        drawingManager.setDrawingMode(null);
        selectedArea = rectangle;

        document.getElementById("select-area").classList.remove("pressed");
        enableDelete(true, false);
    });
}

function selectArea() {
    if (document.getElementById("select-area").classList.contains("pressed")) {
        // Already in select area mode, untoggle button and exit the
        document.getElementById("select-area").classList.remove("pressed");
        drawingManager.setDrawingMode(null);
        return;
    }

    // Erase any existing selection rect and put user in rect drawing mode
    selectNone();
    document.getElementById("select-area").classList.add("pressed");

    //Setting options for the Drawing Tool. In our case, enabling Polygon shape.
    drawingManager.setOptions({
        drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.RECTANGLE],
        },
        rectangleOptions: {
            strokeColor: "#6c6c6c",
            strokeWeight: 3.5,
            fillColor: "#926239",
            fillOpacity: 0.6,
            editable: true,
            draggable: true,
        },
    });
}

function deleteMarker() {
    erasePoint();
}

function deleteAreaBoundary() {
    // Remove any selection area
    if (isInitalized(selectedArea)) {
        selectedArea.setMap(null);
        selectedArea = null;
    }

    if (isInitalized(selectedAreaControls)) {
        selectedAreaControls.close();
        selectedAreaControls = null;
    }

    enableDelete(false, false);
}

function enableDelete(all, single) {
    let btnDeleteAll = $("#delete-all-btn");
    let btnDelete = $("#delete-btn");

    if (all) {
        btnDeleteAll.removeClass("disabled");
    } else {
        btnDeleteAll.addClass("disabled");
    }

    if (single) {
        btnDelete.removeClass("disabled");
    } else {
        btnDelete.addClass("disabled");
    }
}
function updateLockIcon() {
    var lock = document.getElementById("lock-icon");
    if ($("#lock-window").prop("checked")) {
        lock.classList.remove("fa-lock-open");
        lock.classList.add("fa-lock");
    } else {
        lock.classList.remove("fa-lock");
        lock.classList.add("fa-lock-open");
    }
}

function updateDateRange(startDate, endDate) {
    var durationContainer = document.getElementById("duration-container");
    if (startDate.getTime() == -64800000) {
        durationContainer.style.display = "none";
        return;
    } else durationContainer.style.display = "block";

    updateLockIcon();

    // Change the slider and labels related to the date range
    $("#date-start").text(moment.tz(startDate, TZ_STRING).format(DATE_FORMAT));
    $("#date-sep").html("&mdash;");
    $("#date-end").text(moment.tz(endDate, TZ_STRING).format(DATE_FORMAT));

    updateExposurePoints();

    var durHours = (endDate.getTime() - startDate.getTime()) / (60 * 60 * 1000);
    var Days = Math.floor(durHours / 24);
    var Remainder = durHours % 24;
    var Hours = Math.floor(Remainder);

    var text = "";
    if (Days > 0) {
        text += Days + " day"; // TRANSLATION:
        if (Days > 1) text += "s"; // TRANSLATION: plural
    }
    if (Hours > 0) {
        text += " " + Hours + " hr"; // TRANSLATION:
        if (Hours > 1) text += "s"; // TRANSLATION: plural
    }
    $("#duration").text(text);
}

function startupSequence() {
    // Setup the web UI for whatever login is necessary
    if (has_backend) {
        $("#login-panel").show();
    } else {
        $("#get-map-api-panel").show();
    }
}

function enterAPIKey() {
    localStorage.setItem("MAP_API_KEY", $("#api-key").val());
    location.reload();
}

function doLogin() {
    const payload = JSON.stringify({ username: $("#username").val(), password: $("#password").val() });
    $.post(getAJAXOptions("/login"), payload)
        .done((data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("MAP_API_KEY", data.maps_api_key);
            document.cookie = "token=" + data.token;
            location.reload();
        })
        .fail((data) => {
            $("#validateTips").text(err);
        });
}

function showBounds() {
    let ne = map.getBounds().getNorthEast();
    let sw = map.getBounds().getSouthWest();

    $("#bounds").val(
        'bounds: { "ne": { "latitude": ' +
            ne.lat().toString() +
            ', "longitude": ' +
            ne.lng().toString() +
            "}, " +
            '"sw": { "latitude": ' +
            sw.lat().toString() +
            ', "longitude": ' +
            sw.lng().toString() +
            "}}"
    );

    var copyText = document.getElementById("bounds");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    alert("Bounding box copied to the clipboard.");
}

const getAJAXOptions = (url) => {
    return {
        ...AJAX_OPTIONS,
        url: `${BACKEND_ROOT}${url}`,
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    };
};

$.fn.centerMe = function () {
    this.css("left", $(window).width() / 2 - $(this).width() / 2);
    this.css("top", $(window).height() / 2 - $(this).height() / 2);
};

const pushDownload = (data, outFileName) => {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    let dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", outFileName);
    dlAnchorElem.click();
};
