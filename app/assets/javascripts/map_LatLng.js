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
var path;
var path_line;

function initialize() {

//Define custom properties for the map
    mapProp = {
    center: myCenter,
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    panControl: false,
    zoomControl: true,
    disableDefaultUI: true  
  };
//Initialize the map variable and make it get its style form "googleMap" div and properties from mapProp
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

//
    setMarker1();
    
//
    setMarker2();
  marker.setMap(map);

//plot the polyline path between the two markers
    init_path();
//set the path_line
    set_path();
    
    

}

//////////////////Initialize the map after page has loaded//////////////////////////////////////////////////////////////////////

google.maps.event.addDomListener(window,'load', initialize);

///////////Executed on Pressing Go!/////////////////////////////////////////////////////////////////////////////////////////////
function pan() {
  
    lat = document.getElementById("latitude").value;
    lng = document.getElementById("longitude").value;
    lat2 = document.getElementById("latitude2").value;
    lng2 = document.getElementById("longitude2").value;    
//Condition added to account for -90<lat<90 and -180<lng<180.    
  if (((lat||lat2)>90||(lat||lat2)<-90)||((lng||lng2)<-180||(lng||lng2)>180)) {
      alert("The Limits for either Latitude or Longitude are out of bound.Please Try Again!");
      clrTxt();
  } 
  else {
//before changing map, markers set to null to erase previous marker instance.
      marker.setMap(null);
      marker2.setMap(null); 
//Erase previous path line
      path_line.setMap(null);
//before changing map, previous coordinates clear
      clrTxt();
//new center defined according to the coordinated input for LatLng & loc2 is the location of 2nd pair of coordinates
      myCenter = new google.maps.LatLng(lat, lng);
      loc2 = new google.maps.LatLng(lat2,lng2);
//new markers defined for current postions according to the 2 pairs of coordinates
      setMarker1();
      setMarker2();      

//Map autozoomed to display both the markers.
      markers = [marker, marker2];

      new_boundary = new google.maps.LatLngBounds();

      for(i=0; i<markers.length; i++){
        position = markers[i].position;
        new_boundary.extend(position);
      }

      map.fitBounds(new_boundary);
//map panned to new coordinates.
      map.panTo(new_boundary);    
//plot the polyline path between the two markers
      init_path();
      set_path();
  }

}


//function created to clear text boxes//////////////////////////////////////////////////////////////////////////////////////////////
function clrTxt() {

  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";
  document.getElementById("latitude2").value = "";
  document.getElementById("longitude2").value = "";    

}
//function to initialize polyline path///////////////////////////////////////////////////////////////////////////////////////////////
function init_path(){
    path = [myCenter,loc2];
    path_line = new google.maps.Polyline({
        path: path,
        strokeColor: '#FF0000',
        strokeOpacity: 0.6,
        strokeWeight: 4
        });
}

//function to add path////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function set_path(){
    path_line.setMap(map);
}

////function to set first marker//////////////////////////////////////////////////////////////////////////////////////////////////////
function setMarker1(){

  marker = new google.maps.Marker({
    position: myCenter,
    });
  marker.setMap(map);
}

//////////////FUNCTION TO SET 2ND MARKER//////////////////////////////////////////////////////////////////////////////////////////////
function setMarker2(){
    marker2 = new google.maps.Marker({
      position: loc2,
    });
  marker2.setMap(map);   
}