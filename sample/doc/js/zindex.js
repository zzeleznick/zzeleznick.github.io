var api_key = 'CODE_SAMPLES_KEY_9d3608187'; // Get your API key at developer.betterdoctor.com

var resource_url = 'https://api.betterdoctor.com/2014-09-12/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' + api_key;

angular.module('orderByExample', [])
    .controller('ExampleController', ['$scope', '$filter',
        function($scope, $filter) {

            $.get(resource_url, function(data) {
                // data: { meta: {<metadata>}, data: {<array[Doctor]>} }
                doc = data;
                q = doc.data[0].ratings[0].rating;
                console.log(data);
                x = 'done'
                console.log(x);

            });

            var orderBy = $filter('orderBy');
            $scope.friends = [{
                name: 'John',
                phone: '555-1212',
                age: 10
            }, {
                name: 'Mary',
                phone: '555-9876',
                age: 19
            }, {
                name: 'Mike',
                phone: '555-4321',
                age: 21
            }, {
                name: 'Adam',
                phone: '555-5678',
                age: 35
            }, {
                name: 'Julie',
                phone: '555-8765',
                age: 29
            }];

            var delay = 1000; //1 seconds
            setTimeout(function() {
                console.log("x = " + this.x);
                $scope.friends[0].age = 100;
            }, delay);
            console.log("q = " + this.q);

            $scope.friends[0].age = 100;

            $scope.order = function(predicate, reverse) {
                $scope.friends = orderBy($scope.friends, predicate, reverse);
            };
            $scope.order('-age', false);
        }
    ]);
