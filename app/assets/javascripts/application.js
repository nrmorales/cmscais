// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
$(document).ready(function(){
  var gmapdata;
  var gmapmarker;
  var infoWindow;

  var def_zoomval = 10;
  var def_longval = 120.994260;
  var def_latval = 14.593999;

  function if_gmap_init()
  {
	  var curpoint = new google.maps.LatLng(def_latval,def_longval);

	  gmapdata = new google.maps.Map(document.getElementById("mapitems"), {
		  center: curpoint,
		  zoom: def_zoomval,
		  mapTypeId: 'roadmap'
		  });

	  gmapmarker = new google.maps.Marker({
					  map: gmapdata,
					  position: curpoint
				  });

	  infoWindow = new google.maps.InfoWindow;
	  google.maps.event.addListener(gmapdata, 'click', function(event) {
		  document.getElementById("longval").value = event.latLng.lng().toFixed(6);
		  document.getElementById("latval").value = event.latLng.lat().toFixed(6);
		  gmapmarker.setPosition(event.latLng);
		  if_gmap_updateInfoWindow();
	  });

	  google.maps.event.addListener(gmapmarker, 'click', function() {
		  if_gmap_updateInfoWindow();
		  infoWindow.open(gmapdata, gmapmarker);
	  });

	  document.getElementById("longval").value = def_longval;
	  document.getElementById("latval").value = def_latval;

	  return false;
  } // end of if_gmap_init


  function if_gmap_loadpicker()
  {
	  var longval = document.getElementById("longval").value;
	  var latval = document.getElementById("latval").value;

	  if (longval.length > 0) {
		  if (isNaN(parseFloat(longval)) == true) {
			  longval = def_longval;
		  } // end of if
	  } else {
		  longval = def_longval;
	  } // end of if

	  if (latval.length > 0) {
		  if (isNaN(parseFloat(latval)) == true) {
			  latval = def_latval;
		  } // end of if
	  } else {
		  latval = def_latval;
	  } // end of if

	  var curpoint = new google.maps.LatLng(latval,longval);

	  gmapmarker.setPosition(curpoint);
	  gmapdata.setCenter(curpoint);
	  //gmapdata.setZoom(zoomval);

	  if_gmap_updateInfoWindow();
	  return false;
  } // end of if_gmap_loadpicker

  function if_gmap_updateInfoWindow()
  {
	  infoWindow.setContent("Longitude: "+ gmapmarker.getPosition().lng().toFixed(6)+"<br>"+"Latitude: "+ gmapmarker.getPosition().lat().toFixed(6));
  } // end of if_gmap_bindInfoWindow
  if_gmap_init();
});