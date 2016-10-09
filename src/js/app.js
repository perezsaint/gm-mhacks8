  var map;
  var id;
  var marker;

  var circle = $('#circle').circleProgress({
    startAngle: -Math.PI / 2,
    value: 0.75,
    animation: false,
    size: 120,
    thickness: 20,
    fill: {
      gradient: ["#93817c", "#e98d58"]
    }
  });


  function processSpeed(data) {
    var speed = data.average_speed; //.average_speed;

    if (speed !== undefined) {
      updateCircle(speed);
    }
  }

  function processPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    console.log("lat: " + lat);
    console.log("lng: " + lng);

    marker.setPosition(new google.maps.LatLng(lat,lng));
    map.setCenter(new google.maps.LatLng(lat, lng));
  }

  function updateCircle(speed) {
    var speed_limit = 100; //set to whatever the API gives us
    var percent = speed / speed_limit;

    //passed the speed limit
    if (percent > 1) {
      if (percent >= 1.05) {

        id = gm.voice.startTTS(function () {
        }, "Hey, you're going pretty fast. I think you should slow down.");
        gm.voice.stopTTS(id);

      }

      //passed the speed limit
      //We should trigger the warning
      percent = 1; // because circleProgress only takes values from 0 to 1
    }

    circle.circleProgress({value: percent});

  }

  function initMap() {

    var myLat = new google.maps.LatLng( 43.331392586880476, -83.04943084716797);
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.331392586880476, lng: -83.04943084716797},
      zoom: 15,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]
    });
    google.maps.event.addListenerOnce(map, 'idle', function(){
      // do something only the first time the map is loaded
      $('#cover').remove();
      gm.info.getCurrentPosition(processPosition, true);
      gm.info.watchPosition(processPosition, true);
      gm.info.watchVehicleData(processSpeed, ['average_speed']);
    });

    marker = new google.maps.Marker({
      position: myLat,
      map: map,
      title: 'Hello World!'
    });
  }