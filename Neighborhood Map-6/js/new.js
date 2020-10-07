var map, infoWindow;

function initMap() {
    map = new google.maps.Map(
        document.getElementById('map'), {
            center: {
                lat: 34.052234,
                lng: -118.243685
            },
            zoom: 11,
            mapTypeControl: false

        }
    );
    infowindow = new google.maps.InfoWindow();

    ko.applyBindings(new City_Name());

}
function LA_error() {
    document.getElementById('map-error').innerHTML = "Error in Map!";
}
