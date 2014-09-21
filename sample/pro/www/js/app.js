// angular.module is a global place for creating, registering and retrieving Angular modules
// 'directory' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'directory.services' is found in services.js
// 'directory.controllers' is found in controllers.js
angular.module('directory', ['ionic', 'directory.services', 'directory.controllers'])


    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

           .state('landing', {
                url: '/landing',
                templateUrl: 'templates/index.html',
                controller: 'DocCtrl'
            })


           .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'DocCtrl'
            })

           .state('feels', {
                url: '/feeling',
                templateUrl: 'templates/feels.html',
                controller: 'DocCtrl'
            })

             .state('sugar', {
                url: '/sugar',
                templateUrl: 'templates/sugar.html',
                controller: 'DocCtrl'
            })

           .state('stats', {
                url: '/stats',
                templateUrl: 'templates/stats.html',
                controller: 'DocCtrl'
            })

           .state('graphs', {
                url: '/graphs',
                templateUrl: 'templates/graphs.html',
                controller: 'GraphCtrl'
            })



              .state('doc-index', {
                url: '/docs',
                templateUrl: 'templates/doc-index.html',
                controller: 'DocCtrl'
            })

                .state('doc-detail', {
                url: '/doclist/:doclistId',
                templateUrl: 'templates/doc-detail.html',
                controller: 'DocCtrl'
            });

            /*.state('employee-index', {
                url: '/employees',
                templateUrl: 'templates/employee-index.html',
                controller: 'EmployeeIndexCtrl'
            })

            .state('employee-detail', {
                url: '/employee/:employeeId',
                templateUrl: 'templates/employee-detail.html',
                controller: 'EmployeeDetailCtrl'
            })

            .state('employee-reports', {
                url: '/employee/:employeeId/reports',
                templateUrl: 'templates/employee-reports.html',
                controller: 'EmployeeReportsCtrl'
            });  */

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('landing');

    });
