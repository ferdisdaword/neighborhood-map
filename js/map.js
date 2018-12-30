// Initialize the map
var map;
var georssLayer;

// Google API KEY
var API_KEY = "AIzaSyBGJ5vXsMVHTZHa7-OC6wHV--mY_AHq1lM";

// Initialize the default infoWindow
var infoWindow = new google.maps.InfoWindow({
    // default content
    content: '<div><h4 id="property-name"></h4><p id="property-address"></p></div>'
});

// Initialize map function inside the ViewModel
var ViewModel = function() {
    "use strict";
    var self = this;
    self.propertyList = ko.observableArray();
    self.filteredPropertyList = ko.observableArray();

    self.initMap = function() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: {lat: 47.6141516, lng: -122.3302157},
            zoom: 13,
            styles: styles,
            disableDefaultUI: false,
            mapTypeControl: false
        });
        georssLayer = new google.maps.KmlLayer({
          url: 'http://api.flickr.com/services/feeds/geo/?tags=Seattle&lang=en-us&format=feed-georss',
        });
        georssLayer.setMap(map);
    };
    // List properties from model
    self.buildProperties = function() {
        properties.forEach(function(createList) {
            self.propertyList.push(new Property(createList));
        });
    };
    // Event listener for clicks on each property
    self.setPropertyListClick = function() {
        self.propertyList().forEach(function(property) {
            google.maps.event.addListener(property.marker(), "click", function() {
                self.propertyClick(property);
            });
        });
    };
    // Function to handle clicking on a property (either in list or marker)
    self.propertyClick = function(property) {
        // Set the content of the infoWindow
        var infoContent = '<div><h4 id="property-name">' + property.name() +
                            '</h4>' +
                            '<h5 id="property-address">' + property.address() +
                            '</h5>' +
                            '<h6 id="property-type">' + property.type() +
                            '</h6>' +
                            '</div><br>' +
                            '<img class="images" src= http://maps.googleapis.com/maps/api/streetview?size=300x200&location=' + property.lat() + ',' + property.lng() + '&key=' + API_KEY + '>';
        infoWindow.setContent(infoContent);
        // Recenter map to clicked property
        map.panTo(new google.maps.LatLng(property.lat(), property.lng()));
        // Open the infoWindow at the marker location
        infoWindow.open(map, property.marker());
        // Current property marker bounces once when clicked
        self.toggleBounce(property);
    };
    // Animate marker on click
    self.toggleBounce = function(property) {
        property.marker().setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            property.marker().setAnimation(null);
        }, 1500);
    };
    // filter
    self.filterProperties = function() {
        // Set filtered property list to empty array
        self.filteredPropertyList([]);
        // Get search string and length of original property list
        var searchString = $("#search-text").val().toLowerCase();
        var len = self.propertyList().length;
        // Loop through each property in property list
        for (var i = 0; i < len; i++) {
            // Get current property name & type
            var propertyName = self.propertyList()[i].name().toLowerCase();
            // If name or type match search string then add property to filtered property list
            if (propertyName.indexOf(searchString) > -1) {
                self.filteredPropertyList.push(self.propertyList()[i]);
                // Set the map property of the marker to the map
                self.propertyList()[i].marker().setMap(map);
            } else {
                // Set the map property of the marker to null so it won't be visible
                self.propertyList()[i].marker().setMap(null);
            }
        }
    };
    // Add the listener for loading the page
    google.maps.event.addDomListener(window, "load", function() {
        self.initMap();
        self.buildProperties();
        self.setPropertyListClick();
        self.filteredPropertyList(self.propertyList());
    });
    // Find your favorite neighborhood from zoom input
    function zoomToArea() {
        // Initialize the geocoder.
	    var geocoder = new google.maps.Geocoder();
	    // Get the address or place that the user entered.
	    var address = document.getElementById('zoom-to-area-text').value;
	    // Make sure the address isn't blank.
	    if (address == '') {
            window.alert('You must enter an area or address.');
        } else {
            // Geocode the address/area entered to get the center. Then, center the map
            // on it and zoom in
            geocoder.geocode(
                { address: address,
                    componentRestrictions: {locality: 'Washington'}
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(15);
                    } else {
                        window.alert('We could not find that location - try entering a more' +
                        ' specific place.');
                    }
                });
        }
    }
    document.getElementById('zoom-to-area').addEventListener('click', function() {
		zoomToArea();
    });
};

var Property = function(data) {
    "use strict";
    // Set all the properties as knockout observables
    var marker;
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.address = ko.observable(data.address);
    this.type = ko.observable(data.type);
    this.icon = ko.observable(data.icon)
    // Google Maps Marker for this location
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat(), this.lng()),
        map: map,
        title: this.name()
    });
    // Set the marker as a knockout observable
    this.marker = ko.observable(marker);
};

// Load Knockout.js or fail displaying error message
if (typeof ko === 'object') {
    var vm = new ViewModel();
    ko.applyBindings(vm);
} else {
    alert('Knockout.js did not correctly load.  Please try again.');

}

// Display error message if Google Maps does not work
function mapError() {
    window.alert("Google Maps request error");
}
