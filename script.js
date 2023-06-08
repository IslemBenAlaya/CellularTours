$(document).ready(function() {
  // Initialize the map
  var map = L.map('map').setView([56.1304, -106.3468], 4);

  // Add a modern map tile provider (Mapbox)
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaXNsZW1iZW5hbGF5YSIsImEiOiJjbGlhdDllc2cwNXczM2VuYmQ0ZWhqd3NsIn0.FDi7R8iChso-iD81WmBB3Q' // Replace with your Mapbox access token
  }).addTo(map);

  // Create the layers (not added to the map initially)
  var bellLayer = L.tileLayer.wms('http://localhost:8080/geoserver/CellularSites/wms', {
    layers: 'CellularSites:Bell Canada',
    format: 'image/png',
    transparent: true,
    attribution: 'Bell Canada'
  });

  var cityWestLayer = L.tileLayer.wms('http://localhost:8080/geoserver/CellularSites/wms', {
    layers: 'CellularSites:CITY WEST CABLE AND TELEPHONE CORP',
    format: 'image/png',
    transparent: true,
    attribution: 'CITY WEST CABLE AND TELEPHONE CORP'
  });

  var cogecoLayer = L.tileLayer.wms('http://localhost:8080/geoserver/CellularSites/wms', {
    layers: 'CellularSites:Cogeco',
    format: 'image/png',
    transparent: true,
    attribution: 'Cogeco'
  });

  var eastlinkLayer = L.tileLayer.wms('http://localhost:8080/geoserver/CellularSites/wms', {
    layers: 'CellularSites:Eastlink',
    format: 'image/png',
    transparent: true,
    attribution: 'Eastlink'
  });

  var ecotelLayer = L.tileLayer.wms('http://localhost:8080/geoserver/CellularSites/wms', {
    layers: 'CellularSites:Ecotel inc',
    format: 'image/png',
    transparent: true,
    attribution: 'Ecotel inc'
  });

  var execulinkLayer = L.tileLayer.wms('http://localhost:8080/geoserver/CellularSites/wms', {
    layers: 'CellularSites:EXECULINK TELECOM INC',
    format: 'image/png',
    transparent: true,
    attribution: 'EXECULINK TELECOM INC'
  });

  var sasktelLayer = L.tileLayer.wms('http://localhost:8080/geoserver/CellularSites/wms', {
    layers: 'CellularSites:Sasktel',
    format: 'image/png',
    transparent: true,
    attribution: 'Sasktel'
  });

  var sogetelLayer = L.tileLayer.wms('http://localhost:8080/geoserver/CellularSites/wms', {
    layers: 'CellularSites:Sogetel',
    format: 'image/png',
    transparent: true,
    attribution: 'Sogetel'
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

  // Function to toggle the City West Cable and Telephone Corp layer
  function toggleCityWestLayer() {
    var button = document.getElementById("toggleCityWestButton");
    toggleLayer(cityWestLayer, button);
  }

  // Function to toggle the Cogeco layer
  function toggleCogecoLayer() {
    var button = document.getElementById("toggleCogecoButton");
    toggleLayer(cogecoLayer, button);
  }

  // Function to toggle the Eastlink layer
  function toggleEastlinkLayer() {
    var button = document.getElementById("toggleEastlinkButton");
    toggleLayer(eastlinkLayer, button);
  }

  // Function to toggle the Ecotel layer
  function toggleEcotelLayer() {
    var button = document.getElementById("toggleEcotelButton");
    toggleLayer(ecotelLayer, button);
  }

  // Function to toggle the Execulink Telecom Inc layer
  function toggleExeculinkLayer() {
    var button = document.getElementById("toggleExeculinkButton");
    toggleLayer(execulinkLayer, button);
  }

  // Function to toggle the Sasktel layer
  function toggleSasktelLayer() {
    var button = document.getElementById("toggleSasktelButton");
    toggleLayer(sasktelLayer, button);
  }

  // Function to toggle the Sogetel layer
  function toggleSogetelLayer() {
    var button = document.getElementById("toggleSogetelButton");
    toggleLayer(sogetelLayer, button);
  }

  // Attach click event listeners to the buttons
  document.getElementById("toggleBellButton").addEventListener("click", toggleBellLayer);
  document.getElementById("toggleCityWestButton").addEventListener("click", toggleCityWestLayer);
  document.getElementById("toggleCogecoButton").addEventListener("click", toggleCogecoLayer);
  document.getElementById("toggleEastlinkButton").addEventListener("click", toggleEastlinkLayer);
  document.getElementById("toggleEcotelButton").addEventListener("click", toggleEcotelLayer);
  document.getElementById("toggleExeculinkButton").addEventListener("click", toggleExeculinkLayer);
  document.getElementById("toggleSasktelButton").addEventListener("click", toggleSasktelLayer);
  document.getElementById("toggleSogetelButton").addEventListener("click", toggleSogetelLayer);
});
