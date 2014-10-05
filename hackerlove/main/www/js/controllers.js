angular.module('directory.controllers', ["firebase"])

.controller('EmployeeIndexCtrl', function($scope, EmployeeService) {

    $scope.searchKey = "";

    $scope.clearSearch = function() {
        $scope.searchKey = "";
        findAllEmployees();
    }

    $scope.search = function() {
        EmployeeService.findByName($scope.searchKey).then(function(employees) {
            $scope.employees = employees;
        });
    }

    var findAllEmployees = function() {
        EmployeeService.findAll().then(function(employees) {
            $scope.employees = employees;
        });
    }

    findAllEmployees();

})

/*

.controller('DocListCtrl', function ($scope, $stateParams, DocService) {
    DocService.findById($stateParams.doclistId).then(function(doclist) {
        $scope.doclist = doclist;
    });
}) */


.controller('FbCtrl', function($scope, $firebase, $location) {
    console.log("blah");

     $scope.fbLogin = function() {
          var uref = FireRef;
          var sref = SessionRef;
          var auth = new FirebaseSimpleLogin(sref, function(error, user) {
              if (error) {
                  // an error occurred while attempting login
                  alert(error);
              } else if (user) {
                  // user authenticated with Firebase
                  //alert('User ID: ' + user.id + ', Provider: ' + user.provider);
                  x = user;
                  var count = 0;
                  var z = x.displayName.split(" ");
                  var gender = x.thirdPartyUserData.gender;
                  var ageObject = x.thirdPartyUserData.age_range;
                  var age = ageObject.min + ageObject.max
                  age = age/2;
                  var picLink = x.thirdPartyUserData.picture.data.url;


                  if (z.length != 2) {
                      z[1] = "";
                  }


                  fcount = 0;
                  sref.on('child_added', function(snap) {
                      fcount++;
                      console.log('session added', snap.name());
                  });
                  // length will always equal count, since snap.val() will include every child_added event
                  // triggered before this point
                  sref.once('value', function(snap) {
                      console.log('initial session data loaded!', Object.keys(snap.val()).length === fcount);
                  });

                  if (count == 0) {
                      var newUserRef = sref.push();
                      newUserRef.set({
                          'user_id': x.id,
                          'firstName': z[0],
                          'lastName': z[1]
                      });
                      console.log('session added');
                      count++;
                      var update = 1;
                      for (key in GlobalU) {
                        console.log(key.id);
                        if (x.id == key.id) {
                            update = 0;
                            break;
                        }
                      }
                      if (update == 1) {
                         GlobalU.push(x);
                         console.log('pushed' + x.id);
                      }
                  }

                  var sesQuery = sref.limit(10);
                  var uQuery = uref.limit(10);

                  // Get the 10 latest posts
                  sesQuery.on('child_added', function(snapshot) {
                      var postInfo = snapshot.val();
                      console.log(postInfo);
                      console.log(count++);
                  });

                $scope.$apply(function() { $location.path("/createProfile"); });


              } else {
                  // user is logged out
              }
          });

          // attempt to log the user in with your preferred authentication provider
          auth.login('facebook');
      }


    $scope.logger = function() {
        //$scope.user = "hi";
        console.log("blah2");

        Parse.FacebookUtils.logIn('user_location, user_relationship_details', { //pass in age_range and location then get current_location from page, also user/picture
            success: function(user) {

                var currentUser = Parse.User.current();
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'address': user.user_location
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var point = new Parse.GeoPoint({
                            latitude: results[0].geometry.location.lat(),
                            longitude: results[0].geometry.location.lng()
                        });
                        currentUser.set("location", point);
                    } else {
                        alert("Something got wrong " + status);
                    }
                });

                if (!user.existed()) {
                    currentUser.set("name", user.name);
                    currentUser.set("id", user.id);
                    currentUser.set("gender", user.gender);
                    currentUser.set("sexual_interests", user.user_relationship_details);
                    alert("User signed up and logged in through Facebook!");
                } else {
                    alert("User logged in through Facebook!");
                }
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        }); //just call user.get("key") for everything

        test();
    }
    var test = function() {
        console.log('inner');
    }

})


.controller('GraphCtrl', function($scope, GraphService) {
    (function() {
        var t;

        function size(animate) {
                if (animate == undefined) {
                    animate = false;
                }
                clearTimeout(t);
                t = setTimeout(function() {
                    $("canvas").each(function(i, el) {
                        $(el).attr({
                            "width": $(el).parent().width(),
                            "height": $(el).parent().outerHeight()
                        });
                    });
                    redraw(animate);
                    var m = 0;
                    $(".widget").height("");
                    $(".widget").each(function(i, el) {
                        m = Math.max(m, $(el).height());
                    });
                    $(".widget").height(m);
                }, 30);
            }
            /*
            $(window).on('resize', function() {
                size(false);
            });
            */

        function redraw(animation) {
            var options = {};
            if (!animation) {
                options.animation = false;
            } else {
                options.animation = true;
            }
            var data = [{
                    value: 20,
                    color: "#637b85"
                }, {
                    value: 30,
                    color: "#2c9c69"
                }, {
                    value: 40,
                    color: "#dbba34"
                }, {
                    value: 10,
                    color: "#c62f29"
                }

            ];
            var canvas = document.getElementById("hours");
            var ctx = canvas.getContext("2d");
            new Chart(ctx).Doughnut(data, options);

            var data = {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{
                    fillColor: "rgba(99,123,133,0.4)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: [65, 54, 30, 81, 56, 55, 40]
                }, {
                    fillColor: "rgba(219,186,52,0.4)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: [20, 60, 42, 58, 31, 21, 50]
                }, ]
            }
            var canvas = document.getElementById("shipments");
            var ctx = canvas.getContext("2d");
            new Chart(ctx).Line(data, options);



            var data = {
                labels: ["Happy", "Anxious", "Lonely", "Hopeful", "Slow", "Frustrated"],
                datasets: [{
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "#637b85",
                    pointColor: "#dbba34",
                    pointStrokeColor: "#637b85",
                    data: [65, 59, 90, 81, 30, 56]
                }]
            }
            var canvas = document.getElementById("departments");
            var ctx = canvas.getContext("2d");
            new Chart(ctx).Radar(data, options);
        }
        size(true);

    }());

})

.controller('DocCtrl', function($scope, $http, $filter) {
    var api_key = 'CODE_SAMPLES_KEY_9d3608187'; // Get your API key at developer.betterdoctor.com
    //mental-health-counselor
    /*var resource_url = 'https://api.betterdoctor.com/2014-09-12/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' + api_key;

    $http.get('https://api.betterdoctor.com/2014-09-12/doctors?location=37.849,-122.269,100&skip=0&limit=15&user_key=CODE_SAMPLES_KEY_9d3608187').
    success(function(data, status, headers, config) {
        zdocs = $scope.docs = data;
        zzdocs = $scope.sdocs = data.data;
        for (var i = 0; i < zzdocs.length; i++) {
            // console.log(zzdocs[i].profile.first_name);
            $scope.sdocs[i].name = zzdocs[i].profile.first_name;
            $scope.sdocs[i].lname = zzdocs[i].profile.last_name;
            $scope.sdocs[i].id = i;
            $scope.sdocs[i].rating = zzdocs[i].ratings[0].rating;
            $scope.sdocs[i].spec = zzdocs[i].specialties[0].name;
            $scope.sdocs[i].zscore = Math.floor(Math.random() * 40 + 60);
        }

        var orderBy = $filter('orderBy');
        //zdocs.data[0].ratings[0].rating
        // console.log(data);

        $scope.order = function(predicate, reverse) {
            $scope.sdocs = orderBy($scope.sdocs, predicate, reverse);
        }

        $scope.searchKey = "";

        $scope.clearSearch = function() {
            $scope.searchKey = "";
        }

        $scope.search = function() {
            var results = sdocs.filter(function(element) {
                var fullName = element.firstName + " " + element.lastName;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            $scope.sdocs = sdocs;
        };

    }).
    error(function(data, status, headers, config) {
        // log error
    });
*/
});
