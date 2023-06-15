$(document).ready(function() {
  // Initialize the map
  var map = L.map('map', {
    zoomControl: false // Disable the default zoom control
  }).setView([56.1304, -106.3468], 4);

  // Add a custom zoom control
  L.control.zoom({
    position: 'topright' // Set the position of the zoom control
  }).addTo(map);

  // Add OpenStreetMap as the tile provider
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: Infinity, // Modify the maximum zoom limit
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Create the bellLayer with onEachFeature function to display popups
  var bellLayer = L.geoJSON().addTo(map);

// Load the GeoJSON data from GitHub repository
fetch('https://raw.githubusercontent.com/IslemBenAlaya/CellularTours/main/Bell%20Canada.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    bellLayer.addData(data);
    map.fitBounds(bellLayer.getBounds()); // Adjust the map bounds to fit the GeoJSON layer
  })
  .catch(function(error) {
    console.error('Error:', error);
  });


  // Function to toggle a layer
  function toggleLayer(layer, button) {
    if (map.hasLayer(layer)) {
      map.removeLayer(layer);
      button.classList.remove('active');
    } else {
      layer.addTo(map);
      button.classList.add('active');
    }
  }

  // Function to toggle the Bell Canada layer
  function toggleBellLayer() {
    var button = document.getElementById("toggleBellButton");
    toggleLayer(bellLayer, button);
  }

  // Attach click event listeners to the buttons
  document.getElementById("toggleBellButton").addEventListener("click", toggleBellLayer);

  // Add a geocoding control for location search
  var geocoder = L.Control.geocoder({
    defaultMarkGeocode: false
  }).addTo(map);

  // Location marker
  var geocodeMarker = null;

  // Function to remove the location marker with animation
  function removeMarker(marker) {
    if (marker) {
      anime({
        targets: marker._icon,
        scale: 0,
        duration: 500,
        easing: 'easeInOutSine',
        complete: function() {
          map.removeLayer(marker);
          geocodeMarker = null;
        }
      });
    }
  }

  // Event to display the geocoding search result on the map
  geocoder.on('markgeocode', function (e) {
    var result = e.geocode;

    // Remove the previous marker if it exists
    removeMarker(geocodeMarker);

    // Add the marker for the new location with animation
    geocodeMarker = L.marker(result.center, { draggable: true, opacity: 0 }).addTo(map);

    // Marker appearance animation
    anime({
      targets: geocodeMarker._icon,
      opacity: 1,
      duration: 200, // Reduce the duration to 200 (faster)
      easing: 'easeInOutSine'
    });

    // Create a <span> element for the delete symbol
    var deleteButton = document.createElement('span');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Use the desired Font Awesome CSS class and symbol

    // Add custom CSS style if needed
    deleteButton.style.cursor = 'pointer';

    // Animation for hovering over the delete button
    deleteButton.addEventListener('mouseover', function() {
      anime({
        targets: deleteButton,
        rotate: '360deg',
        duration: 50, // Reduce the duration to 50 (faster)
        easing: 'easeInOutSine'
      });
    });

    // Animation for clicking the delete button
    deleteButton.addEventListener('click', function() {
      anime({
        targets: deleteButton,
        scale: 0,
        duration: 50, // Reduce the duration to 50 (faster)
        easing: 'easeInOutSine',
        complete: function() {
          removeMarker(geocodeMarker);
        }
      });
    });

    // Add the delete button to the marker's popup
    geocodeMarker.bindPopup(deleteButton);

    // Handle marker dragstart event
    geocodeMarker.on('dragstart', function (e) {
      map.closePopup(); // Close any open popups when dragging the marker
    });

    geocodeMarker.on('dragend', function (e) {
      var marker = e.target;
      var position = marker.getLatLng();
      console.log('New marker position:', position);
    });

    // Handle marker click event
    geocodeMarker.on('click', function (e) {
      var marker = e.target;
      console.log('Marker clicked');
      // Add your code here to handle marker click action (e.g., display a popup, etc.)
    });
  });
});
