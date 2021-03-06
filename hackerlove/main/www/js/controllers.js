angular.module('directory.controllers', ["firebase", 'ionic', 'ionic.contrib.ui.cards'])

.directive('dragBack', function($ionicGesture, $state) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {

            $ionicGesture.on('swipe', function(event) {
                console.log('Got swiped!');
                event.preventDefault();
                window.history.back();

            }, elem);

        }
    }
})

.directive('myRefresher', function() {
    return {
        restrict: 'E',
        replace: true,
        require: ['^?ionContent', '^?ionList'],
        template: '<div class="scroll-refresher"><div class="ionic-refresher-content"><i class="icon ion-arrow-down-c icon-pulling"></i><i class="icon ion-loading-c icon-refreshing"></i></div></div>',
        scope: true
    };
})

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
                age = age / 2;
                var picLink = x.thirdPartyUserData.picture.data.url;


                if (z.length != 2) {
                    z[1] = "";
                }


                fcount = 0;

                /*
                sref.on('child_added', function(snap) {
                    fcount++;
                    console.log('session added', snap.name());
                });
                // length will always equal count, since snap.val() will include every child_added event
                // triggered before this point
                sref.once('value', function(snap) {
                    console.log('initial session data loaded!', Object.keys(snap.val()).length === fcount);
                }); */

                if (count == 0) {
                    var newUserRef = uref.child(user.id);
                    newUserRef.set({
                        'user_id': x.id,
                        'firstName': z[0],
                        'lastName': z[1],
                        'age': age,
                        'gender': gender,
                        'picLink': picLink
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

                //TODO: Get user id of current person : their_id


                /*uref.child(their_id + "/matches").once('value', function(snapshot) {
                      for(key in snapshot.val()) {
                      //list all likes
                      console.log(key);
                      if ( key.likes == user.id ) { //is there a match

                      }

                  }
                }) */
                /*
                                   uref.child(their_id + "/matches" +"/user.id").once('value', function(snapshot) {
                                    var result = snapshot.val(); })
                                   if (result == true) {
                                        console.log('A match between ' + user.id + "and " + their_id);
                                   }
                */


                /*
                otherPersonMatchesRef.once('value', function(snapshot) {
                  console.log(snapshot.val() )
                }); */



                $scope.$apply(function() {
                    $location.path("/createProfile");
                });


            } else {
                // user is logged out
            }
        });

        // attempt to log the user in with your preferred authentication provider
        auth.login('facebook', {
            rememberMe: true,
            scope: 'email, user_likes'
        });
    }


    $scope.logger = function() {
        //$scope.user = "hi";
        FB.logout();
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


.controller('ProfileCtrl', function($scope, $firebase, $location, $q) {
    console.log("profile");
    var uref = FireRef;
    zuser = null;
    var defer = $q.defer();

    if (GlobalU.length != 0) {
        console.log('session stored');
        uref.child(GlobalU[0].id).once('value', function(snapshot) {
            result = snapshot.val();
            console.log(result);
            age = result["age"];
            $("#pic")[0].src = result["picLink"];
            $("#age").text("Age: " + age);
        })
    } else {
        console.log('need to login with fb');

        var ref = new Firebase("https://hackerlove.firebaseio.com");
        var auth = new FirebaseSimpleLogin(ref, function(error, user) {
            zuser = user;
            sdata = ref.child("users/" + zuser.id).on('value', function(snapshot) {
                //sdata.child('age').on('value', function(snapshot) {
                result = snapshot.val();
                age = result["age"];
                $("#pic")[0].src = result["picLink"];
                $("#age").text("Age: " + age);
            })

            console.log(user);
            $("#name").text(zuser.displayName);
        })

    }

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
                age = age / 2;
                var picLink = x.thirdPartyUserData.picture.data.url;


                if (z.length != 2) {
                    z[1] = "";
                }


                fcount = 0;



                if (count == 0) {
                    var newUserRef = uref.child(user.id);
                    newUserRef.set({
                        'user_id': x.id,
                        'firstName': z[0],
                        'lastName': z[1],
                        'age': age,
                        'gender': gender,
                        'picLink': picLink
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


            } else {
                // user is logged out
            }
        });

        // attempt to log the user in with your preferred authentication provider
        auth.login('facebook');
    }
})



.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
    var cardTypes = [{
        title: 'Swipe down to clear the card',
        image: 'img/tiff.png'
    }, {
        title: 'Where is this?',
        image: 'img/tiff.png'
    }, {
        title: 'What kind of grass is this?',
        image: 'img/tiff.png'
    }, {
        title: 'What beach is this?',
        image: 'img/ionic.png'
    }, {
        title: 'What kind of clouds are these?',
        image: 'img/ionic.png'
    }];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

    $scope.cardSwiped = function(index) {
        $scope.addCard();
    };

    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
    $scope.goAway = function() {
        var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
        card.swipe();
    };
})

.controller('TestCtrl', function($scope) {
$scope.cards = [{
        title: 'Swipe down to clear the card',
        image: 'img/tiff.png',
        likes: [1,2,3],
        id: 1
    }, {
        title: 'Where is this?',
        image: 'img/tiff.png',
        likes: [1,2,4],
        id: 2
    }, {
        title: 'What kind of grass is this?',
        image: 'img/tiff.png',
        likes: [1,2,4],
        id: 3
    }, {
        title: 'What beach is this?',
        image: 'img/ionic.png',
        likes: [1,2,4],
        id: 4
    }, {
        title: 'What kind of clouds are these?',
        image: 'img/ionic.png',
        likes: [1,2,4],
        id: 5
    }];
    cards = $scope.cards;
    $scope.like = function(id) {
        console.log(id);
        //update the array
    };
    $scope.dislike = function(id) {
        console.log("Dislike this: " + id);
        //update the array
    };
})


.controller('ChatCtrl', function($scope, $firebase, $location, $q) {
    console.log('chat');
})



.controller('RecCtrl', function($scope, $firebase, $location, $q) {
    console.log("profile");
    var uref = FireRef;
    zuser = null;
    var defer = $q.defer();

    if (GlobalU.length != 0) {
        console.log('session stored');
        uref.child(GlobalU[0].id).once('value', function(snapshot) {
            result = snapshot.val();
            console.log(result);
            age = result["age"];
           // $("#pic")[0].src = result["picLink"];
           // $("#age").text("Age: " + age);
        })
    } else {
        console.log('need to login with fb');

        var ref = new Firebase("https://hackerlove.firebaseio.com");
        var auth = new FirebaseSimpleLogin(ref, function(error, user) {
            zuser = user;
            sdata = ref.child("users/" + zuser.id).on('value', function(snapshot) {
                //sdata.child('age').on('value', function(snapshot) {
                result = snapshot.val();
                age = result["age"];
                // $("#pic")[0].src = result["picLink"];
                //$("#age").text("Age: " + age);
            })

            console.log(user);
            //$("#name").text(zuser.displayName);
        })

    }
});
