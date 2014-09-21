angular.module('directory.controllers', [])

    .controller('EmployeeIndexCtrl', function ($scope, EmployeeService) {

        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            findAllEmployees();
        }

        $scope.search = function () {
            EmployeeService.findByName($scope.searchKey).then(function (employees) {
                $scope.employees = employees;
            });
        }

        var findAllEmployees = function() {
            EmployeeService.findAll().then(function (employees) {
                $scope.employees = employees;
            });
        }

        findAllEmployees();

    })

    .controller('EmployeeDetailCtrl', function ($scope, $stateParams, EmployeeService) {
        EmployeeService.findById($stateParams.employeeId).then(function(employee) {
            $scope.employee = employee;
        });
    })

    .controller('EmployeeReportsCtrl', function ($scope, $stateParams, EmployeeService) {
        EmployeeService.findByManager($stateParams.employeeId).then(function(employees) {
            $scope.employees = employees;
        });
    })
    /*

    .controller('DocListCtrl', function ($scope, $stateParams, DocService) {
        DocService.findById($stateParams.doclistId).then(function(doclist) {
            $scope.doclist = doclist;
        });
    }) */


    .controller('DocCtrl', function($scope, $http, $filter) {
        var api_key = 'CODE_SAMPLES_KEY_9d3608187'; // Get your API key at developer.betterdoctor.com
//mental-health-counselor
        var resource_url = 'https://api.betterdoctor.com/2014-09-12/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' + api_key;

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

        $scope.clearSearch = function () {
            $scope.searchKey = "";
        }

        $scope.search = function () {
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
    });