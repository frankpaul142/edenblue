var app = angular.module('EdenBlue', ['ngRoute', 'route-segment', 'view-segment']);

app.config(function ($routeSegmentProvider) {
    $routeSegmentProvider.
            when('/', 'hosteria').
            when('/reservar', 'reservar').
            when('/hosteria', 'hosteria').
            when('/hosteria/infraestructura', 'hosteria.infraestructura').
            when('/hosteria/entorno', 'hosteria.entorno').
            when('/hosteria/servicios', 'hosteria.servicios').
            when('/excursiones', 'excursiones').
            when('/ubicacion', 'ubicacion').
            when('/login', 'login').
            when('/registro', 'registro').
            segment('reservar', {
                templateUrl: 'templates/_reservar.html',
                controller: 'reservarController'
            }).
            segment('hosteria', {
                templateUrl: 'templates/_hosteria.html',
                controller: 'hosteriaController'
            }).
            within().
            segment('infraestructura', {
                default: true,
                templateUrl: 'templates/hosteria/_infraestructura.html',
                controller: 'infraestructuraController'
            }).
            segment('entorno', {
                templateUrl: 'templates/hosteria/_entorno.html',
                controller: 'entornoController'
            }).
            segment('servicios', {
                templateUrl: 'templates/hosteria/_servicios.html',
                controller: 'serviciosController'
            }).
            up().
            segment('excursiones', {
                templateUrl: 'templates/_excursiones.html',
                controller: 'excursionesController'
            }).
            segment('ubicacion', {
                templateUrl: 'templates/_ubicacion.html',
                controller: 'ubicacionController'
            }).
            segment('login', {
                templateUrl: 'templates/_login.html',
                controller: 'loginController'
            }).
            segment('registro', {
                templateUrl: 'templates/_registro.html',
                controller: 'registroController'
            });
});

var $fotoramaDiv = $('.fotorama').fotorama({
    data: [
        {img: 'images/fondo.jpg'}
    ]
});
var fotorama = $fotoramaDiv.data('fotorama');

app.controller('reservarController', function () {
    fotorama.load([
        {img: 'images/fondo5.jpg'}
    ]);
});

app.controller('hosteriaController', function () {
    toggleGallery();
});
app.controller('infraestructuraController', function ($scope) {
    $scope.$parent.breadcrumbs = 'Hostería / Infraestructura';
    fotorama.load([
        {img: 'images/fondo.jpg'}
    ]);
});
app.controller('entornoController', function ($scope) {
    $scope.$parent.breadcrumbs = 'Hostería / Entorno';
    fotorama.load([
        {img: 'images/fondo.jpg'}
    ]);
});
app.controller('serviciosController', function ($scope, $http) {
    $scope.$parent.breadcrumbs = 'Hostería / Servicios';
    $http.get('site/loadServices').success(function (response) {
        $scope.services = response;
        fotorama.destroy();
        $scope.services.forEach(function(service) {
            fotorama.push({img: 'images/' + service.photos[0].source});
        });
    });

});

app.controller('excursionesController', function () {
    toggleGallery();
    fotorama.load([
        {img: 'images/fondo3.jpg'}
    ]);
});

app.controller('ubicacionController', function () {
var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('map'),mapOptions);
  console.log(map);
}
google.maps.event.addDomListener(window, 'load', initialize);
});

app.controller('loginController', function () {
    fotorama.load([
        {img: 'images/fondo2.jpg'}
    ]);
});
app.controller('registroController', function () {
    fotorama.load([
        {img: 'images/fondo5.jpg'}
    ]);
});


function toggleGallery() {
    $(".boton-index2").hide();
    $(".boton-index").click(function () {
        $(this).hide();
        $(".boton-index2").show();
        $("#content").animate({bottom: '370px'});
    });
    $(".boton-index2").click(function () {
        $(this).hide();
        $(".boton-index").show();
        $("#content").animate({bottom: '0px'});
    });
}

