var app = angular.module('EdenBlue', ['ngRoute', 'route-segment', 'view-segment']);

app.config(function ($routeSegmentProvider) {
    $routeSegmentProvider.
            when('/', 'hosteria').
            when('/reservar', 'reservar').
            when('/hosteria', 'hosteria').
            when('/hosteria/infraestructura', 'hosteria.infraestructura').
            when('/hosteria/entorno', 'hosteria.entorno').
            when('/hosteria/habitaciones', 'hosteria.habitaciones').
            when('/servicios', 'servicios').
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
            segment('habitaciones', {
                templateUrl: 'templates/hosteria/_habitaciones.html',
                controller: 'habitacionesController'
            }).
            up().
            segment('servicios', {
                templateUrl: 'templates/_servicios.html',
                controller: 'serviciosController'
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
app.controller('habitacionesController', function ($scope,$http) {
    $scope.$parent.breadcrumbs = 'Hostería / Habitaciones';
    $http.get('site/loadTypeRooms').success(function (response) {
        $scope.rooms = response;
        /*fotorama.destroy();
        $scope.services.forEach(function (service) {
            fotorama.push({img: 'images/' + service.photos[0].source});
        });*/
    });
});

app.controller('serviciosController', function ($scope, $http) {
    //$scope.$parent.breadcrumbs = 'Hostería / Servicios';
    toggleGallery();
    $http.get('site/loadServices').success(function (response) {
        $scope.services = response;
        fotorama.destroy();
        $scope.services.forEach(function (service) {
            if(typeof service.photos[0] !== 'undefined'){
            fotorama.push({img: 'images/' + service.photos[0].source});
        }
        });
    });
});

app.controller('ubicacionController', function () {
    var mapDiv = document.getElementById('map');
    var catalunya = new google.maps.LatLng(41.652393, 1.691895);
    var options = {
        center: catalunya,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapa = new google.maps.Map(mapDiv, options);
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
    $(".fotorama__nav-wrap").hide();
    $(".boton-index").click(function () {
        $(this).hide();
        $(".boton-index2").show();
        var height=$("#content").height();
        $("#content").animate({bottom: height-65}, 'fast');
        $(".top").animate({top: '-25px'}, 'fast');
        $(".fotorama__nav-wrap").fadeIn();
    });
    $(".boton-index2").click(function () {
        $(".top").animate({top: '0px'}, 'fast');
        $(this).hide();
        $(".boton-index").show();
        $("#content").animate({bottom: '0px'}, 'fast');
        $(".fotorama__nav-wrap").fadeOut();
    });
}

