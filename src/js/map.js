function initMap() {
    var location = {lat: 53.3489, lng: -6.2430}; // Replace with your location
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
