//Object for places in LA
var placesData = [{
        LAtitle: 'Santa Monica State Beach',
        LAid: '49e27207f964a52016621fe3',
        LAloc: {

          lng: -118.501724,
            lat: 34.012903

        },

        LaSelected: false,
        LaShow: true

    },

    {
        LAtitle: 'Amoeba Music',
        LAid: '40a2ba80f964a5200ef31ee3',
        LAloc: {
          lng: -118.329146,
            lat: 34.097685

        },
        LaSelected: false,
        LaShow: true

    },
    {
        LAtitle: 'The Broad Museum',
        LAid: '4eeb4c14b634b469c36a8c80',
        LAloc: {
          lng: -118.250558,
            lat: 34.054469

        },
        LaSelected: false,
        LaShow: true

    },
    {
        LAtitle: 'Salt & Straw',
        LAid: '563fdd4ccd1088eed9da1cc6',
        LAloc: {
          lng: -118.235457,
            lat: 34.046007

        },
          LaSelected: false,
        LaShow: true

    },
    {
        LAtitle: 'Runyon Canyon Park',
        LAid: '40a40c00f964a5201df31ee3',
        LAloc: {
          lng: -118.350378,
            lat: 34.110681

        },
        LaSelected: false,
        LaShow: true



    },
    {


        LAtitle: 'Pantages Theatre',
          LAid: '4a7b9483f964a5207aeb1fe3',
        LAloc: {

          lng: -118.325789,
            lat: 34.10201

        },

        LaSelected: false,
        LaShow: true

    },

    {

        LAtitle: 'Giuliano Delicatessen & Bakery',
        LAid: '4b800f7bf964a5208d4e30e3',
        LAloc: {
          lng: -118.355297,
            lat: 33.837907

        },

          LaSelected: false,
        LaShow: true

    },

    {

        LAtitle: 'Griffith Observatory',
        LAid: '4a6e5d0df964a52093d41fe3',
        LAloc: {
            lng: -118.300152,
            lat: 34.119322

        },
        LaSelected: false,
        LaShow: true

    }

];


var City_Name = function()
{
    var CityVariable = this;
    CityVariable.citiLoc = [];
    CityVariable.errorDisplay = ko.observable('');
    for (var c = 0; c < placesData.length; c++) {
        var place = new google.maps.Marker({
            position:{
              lng: placesData[c].LAloc.lng,
                lat: placesData[c].LAloc.lat

              },
              map: map,
            LAtitle: placesData[c].LAtitle,
              selected: ko.observable(placesData[c].LaSelected),
              animation: google.maps.Animation.DROP,
            show: ko.observable(placesData[c].LaShow),

            LAid: placesData[c].LAid

        });

        CityVariable.citiLoc.push(place);
    }

    // Following is the function that drops the marker at speed of 2000ms
    CityVariable.DROP = function(marker) {
        marker.setAnimation(google.maps.Animation.DROP);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 2000);
    };

    // Addition of API Info
    CityVariable.addApiInfo = function(marker) {
        $.ajax({
          dataType: "json",
            url: "https://api.foursquare.com/v2/venues/" + marker.LAid + '?client_id=LJAPO02YPXGUHWZPJJ3ERFUJYGMHYDIQ44DU2HNCZ22BPFRT&client_secret=QAPYNTXDBWCSN5YUGY5Q2TYHP1SVZIWLCFA3TQLS4UNKNJIS&v=20170208',
              success: function(data) {
                // Stores Likes and Ratings
                var end = data.response.venue;

                // To add likes and ratings
                marker.likes = end.hasOwnProperty('likes') ? end.likes.summary : '';
                marker.rating = end.hasOwnProperty('rating') ? end.rating : '';
            },

            // warn if there is error in recievng json
            error: function(p) {
                CityVariable.errorDisplay("Foursquare data is unavailable. Please try again later.");
            }
        });
    };


    var addMarkerInfo = function(marker) {
    CityVariable.addApiInfo(marker);
    marker.addListener('click', function() {
            CityVariable.setSelected(marker);
        });
    };

    //  Iterate through citiLoc Plus add marker
    for (var y = 0; y < CityVariable.citiLoc.length; y++) {
        addMarkerInfo(CityVariable.citiLoc[y]);
    }
    CityVariable.cities = ko.observable('');



    CityVariable.filterList = function() {
        //variable for search text
        var Here = CityVariable.cities();
        infowindow.close();

        //list for user search
        if (Here.length === 0) {
            CityVariable.setAllShow(true);
        }
        else
        {
            for (var m = 0; m < CityVariable.citiLoc.length; m++) {
                // to check whether the cities is there in the citiLoc
                if (CityVariable.citiLoc[m].LAtitle.toLowerCase().indexOf(Here.toLowerCase()) > -1) {

                      CityVariable.citiLoc[m].setVisible(true);
                      CityVariable.citiLoc[m].show(true);

                } else {
                    CityVariable.citiLoc[m].setVisible(false);
                    CityVariable.citiLoc[m].show(false);

                }
            }
        }
        infowindow.close();
    };

    // to show all the markers
    CityVariable.setAllShow = function(marker) {
        for (var k = 0; k < CityVariable.citiLoc.length; k++) {
          CityVariable.citiLoc[k].setVisible(marker);
            CityVariable.citiLoc[k].show(marker);

        }
    };

    CityVariable.setAllUnselected = function() {
        for (var d = 0; d < CityVariable.citiLoc.length; d++) {
            CityVariable.citiLoc[d].selected(false);
        }
    };
    CityVariable.myLoc = CityVariable.citiLoc[0];

    // To Display the reviews

    CityVariable.setSelected = function(LAloc) {
      CityVariable.setAllUnselected();
      LAloc.selected(true);



        CityVariable.myLoc = LAloc;

        CitiLikes = function() {
            if (CityVariable.myLoc.likes === '') {
                return "Sorry! No Likes.";
            } else {
                return "Likable Rating: " + CityVariable.myLoc.likes;
            }
        };

        CitiRating = function() {
            if (CityVariable.myLoc.rating === '') {
                return "Sorry! No ratings";
            } else {

                return "Rated: " + CityVariable.myLoc.rating;
            }
        };

        var InfoWindow = "<h5>" + CityVariable.myLoc.LAtitle + "</h5>" + "<div>" + CitiLikes() + "</div>" + "<div>" + CitiRating() + "</div>";

        infowindow.setContent(InfoWindow);

        infowindow.open(map, LAloc);
        CityVariable.DROP(LAloc);
    };
};
