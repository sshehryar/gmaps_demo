
var marker;
var mapProp;
var map;
var myCenter = new google.maps.LatLng(0,
  0);
var panButton = document.getElementById('panButton');
var lat;
var lng;

function initialize() {
  mapProp = {
    center: myCenter,
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  marker = new google.maps.Marker({
    position: myCenter,
  });

  marker.setMap(map);

}

google.maps.event.addDomListener(window,'load', initialize);

function pan() {
  //function executed on clicking Go! Button.    
  lat = document.getElementById("latitude").value;
  lng = document.getElementById("longitude").value;
  //Condition added to account for -90<lat<90 and -180<lng<180.    
  if ((lat > 90 || lat < -90) || (lng <-180 || lng > 180)) {
    alert("The Limits for either Latitude or Longitude are out of bound.Please Try Again!");
      clrTxt();
  } 
  else {
    //before changing map, marker.setMap(null) used to destroy previous marker instance.
    marker.setMap(null);
    //before changing map, previous coordinates clear
    clrTxt();
    //new center defined according to the coordinated input for LatLng.
    myCenter = new google.maps.LatLng(lat, lng);
    //map panned to new coordinates.
    map.panTo(myCenter);
    //new marker defined for current postion.
    marker = new google.maps.Marker({
      position: myCenter,
    });
    //new marker deployed on map.    
    marker.setMap(map);
    //infowindows added so that when marker is clicked, current latitude + longitude are displayed. 
    var infowindow = new google.maps.InfoWindow({
      content: "<p><b>Latitude:</b></p>" +lat +"<p><b>Longitude:</b></p>" +lng
    });
    //even listener added to cater for the click action on marker.
    google.maps.event.addListener(
      marker, 'click', function() {
        infowindow.open(map, marker);
      });

  }

}

//function created to clear text boxes
function clrTxt() {

  document.getElementById("latitude").value = "";

  document.getElementById("longitude").value = "";

}