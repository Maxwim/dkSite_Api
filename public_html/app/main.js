var app = angular.module("app", ["ngRoute"]);
app.config(function($routeProvider) {
    
    $routeProvider
        .when("/", {

            templateUrl : "partials/home.html"
        })
        .when("/Contact", {
            templateUrl : "partials/contact_horaires.html"
        })
        .when("/Blog", {
        
            templateUrl : "partials/blog/blog.html"
        })
        .when("/Informations", {
        
            templateUrl : "partials/informations.html"
        })
        .otherwise({
            redirectTo : "/"
        });
    
});