// Reference
// Set up Map API: https://developer.here.com/documentation/maps/topics/quick-start.html?cid=email-hereautomation-evaluation2-Javascript-Quickstart-04%3FinsertAppId%3FinsertAppId
// Add marker: https://developer.here.com/documentation/maps/topics/markers.html

var map; 
// Instantiate (and display) a map object:
function initialize() {
   // Initialize the platform object:
    var platform = new H.service.Platform({
        'app_id': 'ZYIQ5swtQDsRUwXTewup',
        'app_code': '6MYBmzItOKKLhzn2xaEz4g'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    map = new google.map.Map(document.getElementById("u36_state0"), mapOptions);
    
    var map = new H.Map(
        document.getElementById('u36_state0'),
        maptypes.normal.map,
        {
          zoom: 14,
          center: { lng: 144.96, lat: -37.81 }
    });

    // Sample of how to add map icon
    var svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon('../images/main/u58.png'),
        coords = {lat: -37.80, lng: 144.96},
        marker = new H.map.Marker(coords, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);

};

