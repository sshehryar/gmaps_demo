
var marker;
var mapProp;
var map;
var myCenter = new google.maps.LatLng(0,
  0);
var panButton = document.getElementById('panButton');
var lat;
var lng;
var lat2;
var lng2;
var marker2;
var loc2 = new google.maps.LatLng(0,0.5);

function initialize() {
  mapProp = {
    center: myCenter,
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    panControl: false,
    zoomControl: true,
    disableDefaultUI: true  
  };

  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  marker = new google.maps.Marker({
    position: myCenter,
  });

  marker.setMap(map);

marker2 = new google.maps.Marker({
            position: loc2,
    
});

marker2.setMap(map);    

}

google.maps.event.addDomListener(window,'load', initialize);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pan() {
  //function executed on clicking Go! Button.    
  lat = document.getElementById("latitude").value;
  lng = document.getElementById("longitude").value;
  lat2 = document.getElementById("latitude2").value;
  lng2 = document.getElementById("longitude2").value;    
  //Condition added to account for -90<lat<90 and -180<lng<180.    
  if (((lat||lat2) > 90 || (lat||lat2) < -90) || ((lng||lng2) <-180 || (lng||lng2) > 180)) {
    alert("The Limits for either Latitude or Longitude are out of bound.Please Try Again!");
      clrTxt();
  } 
  else {
//before changing map, markers set to null to erase previous marker instance.
    marker.setMap(null);
    marker2.setMap(null);  
//before changing map, previous coordinates clear
    clrTxt();
//new center defined according to the coordinated input for LatLng & loc2 is the location of 2nd pair of coordinates
    myCenter = new google.maps.LatLng(lat, lng);
    loc2 = new google.maps.LatLng(lat2,lng2);
//new markers defined for current postions according to the 2 pairs of coordinates
      marker = new google.maps.Marker({
      position: myCenter,
    });
      marker2 = new google.maps.Marker({
      
      position: loc2,
      }); 
//new markers deployed on map.    
    marker.setMap(map);
    marker2.setMap(map);  

//Map autozoomed to display both the markers.
      markers = [marker, marker2];

      new_boundary = new google.maps.LatLngBounds();

      for(i=0; i<markers.length; i++){
        position = markers[i].position;
        new_boundary.extend(position);
      }

      map.fitBounds(new_boundary);
  }
    
//map panned to new coordinates.
        map.panTo(new_boundary);    

}

//function created to clear text boxes
function clrTxt() {

  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";
  document.getElementById("latitude2").value = "";
  document.getElementById("longitude2").value = "";    

}