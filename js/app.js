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
            when('/servicios/:name', 'servicios.servicio').
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
            within().
            segment('servicio', {
                templateUrl: 'templates/servicios/_servicio.html',
                controller: 'servicioController'
            }).
            up().
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

var $fotoramaDiv;
var fotorama;
var rooms;
var services;

app.controller('reservarController', function () {
    fotorama.show(0);
});

app.controller('hosteriaController', function () {
    toggleGallery(false);
    fotorama.show(1);
});
app.controller('infraestructuraController', function ($scope) {
    $scope.$parent.breadcrumbs = 'Hostería / Infraestructura';
});
app.controller('entornoController', function ($scope) {
    $scope.$parent.breadcrumbs = 'Hostería / Entorno';
});
app.controller('habitacionesController', function ($scope, $http) {
    $scope.$parent.breadcrumbs = 'Hostería / Habitaciones';
    $http.get('site/loadTypeRooms').success(function (response) {
        $scope.rooms = response;
        rooms = $scope.rooms;
        $scope.gallery = [];
        $scope.rooms.forEach(function (room) {
            if (room.photos[0] != null) {
                $scope.gallery.push(true);
            }
            else {
                $scope.gallery.push(false);
            }
        });
    });
    viewGallery();
});

app.controller('serviciosController', function ($scope, $http) {
    fotorama.show(2);
    $scope.breadcrumbs = 'Servicios / ';
    $http.get('site/loadServices').success(function (response) {
        $scope.services = [];
        $scope.services2 = [];
        response.forEach(function (s) {
            if (s.description !== null) {
                $scope.services.push(s);
            }
            else {
                $scope.services2.push(s);
            }
        });
        services = $scope.services;
        toggleGallery(false);
    });
});
app.controller('servicioController', function ($scope, $routeParams, $http) {
    $scope.$parent.breadcrumbs = 'Servicios / ' + $routeParams.name;
    if (typeof services === 'undefined') {
        $http.get('site/loadServices').success(function (response) {
            services = [];
            response.forEach(function (s) {
                if (s.description !== null) {
                    services.push(s);
                }
            });
            services.forEach(function (service) {
                if (service.title === $routeParams.name) {
                    $scope.service = service;
                    return;
                }
            });
        });
    }
    else {
        services.forEach(function (service) {
            if (service.title === $routeParams.name) {
                $scope.service = service;
                return;
            }
        });
    }

});

app.controller('ubicacionController', function () {
    fotorama.show(3);
    toggleGallery(false);
});

app.controller('loginController', function () {
    fotorama.show(4);
});
app.controller('registroController', function () {
    fotorama.show(5);
});


function toggleGallery(nav) {
    $(".boton-index2").hide();
    $(".fotorama__nav-wrap").hide();
    $(".boton-index").click(function () {
        $(this).hide();
        $(".boton-index2").show();
        var height = $("#content").height();
        $("#content").animate({bottom: height - 65}, 'fast');
        $(".top").animate({top: '-25px'}, 'fast');
        if (nav) {
            $(".fotorama__nav-wrap").fadeIn();
        }
    });
    $(".boton-index2").click(function () {
        $(".top").animate({top: '0px'}, 'fast');
        $(this).hide();
        $(".boton-index").show();
        $("#content").animate({bottom: '0px'}, 'fast');
        $(".fotorama__nav-wrap").fadeOut();
    });
}

function viewGallery(){
    console.log('view gallery');
    $('.boton-vermas').click(function () {
        console.log('ver galeria');
        $(this).hide();
        $(".boton-index2").show();
        var height = $("#content").height();
        $("#content").animate({bottom: height - 65}, 'fast');
        $(".top").animate({top: '-25px'}, 'fast');
        //$(".fotorama__nav-wrap").fadeIn();
    });
}

var interval;
function loadMap() {
    if (document.getElementById('map') !== null) {
        var mapDiv = document.getElementById('map');
        var catalunya = new google.maps.LatLng(41.652393, 1.691895);
        var options = {
            center: catalunya,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var mapa = new google.maps.Map(mapDiv, options);
        clearInterval(interval);
    }
}

$(document).ready(function () {
    $('.tooltip').tooltipster();
    interval = setInterval(loadMap, 1000);
    $fotoramaDiv = $('.fotorama').fotorama();
    fotorama = $fotoramaDiv.data('fotorama');
    fotorama.load([
        {img: 'images/fondo5.jpg'},
        {img: 'images/fondo.jpg'},
        {img: 'images/fondo2.jpg'},
        {html: '<div id="map" style="height:100%"></div>'},
        {img: 'images/fondo2.jpg'},
        {img: 'images/fondo5.jpg'}
    ]).setOptions({
        arrows: false,
        click: false,
        swipe: false
    });
});