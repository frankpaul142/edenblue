var app = angular.module('EdenBlue', ['ngRoute', 'route-segment', 'view-segment']);

app.config(function($routeSegmentProvider) {
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
var galleryRoom;
var galleryService;

app.controller('reservarController', function() {
    checkGallery();
    fotorama.show(0);
    activeMenu(1);
});

app.controller('hosteriaController', function() {
    checkGallery();
    toggleGallery(false);
    fotorama.show(1);
    activeMenu(2);
});
app.controller('infraestructuraController', function($scope) {
    $scope.$parent.breadcrumbs = 'Hostería / Infraestructura';
});
app.controller('entornoController', function($scope) {
    $scope.$parent.breadcrumbs = 'Hostería / Entorno';
});
app.controller('habitacionesController', function($scope, $http) {
    $scope.$parent.breadcrumbs = 'Hostería / Habitaciones';
    if (typeof rooms === 'undefined') {
        $http.get('site/loadTypeRooms').success(function(response) {
            $scope.rooms = response;
            rooms = $scope.rooms;
        });
    } else {
        $scope.rooms = rooms;
    }
    $scope.viewGallery = function(id) {
        rooms.forEach(function(room) {
            if (room.id == id) {
                fotorama.splice(1, 1, {
                    html: '<div id="fotoramag" data-auto="false" data-nav="thumbs" data-width="100%" data-height="100%" data-fit="cover"></div>'
                });
                var $fotoramagDiv = $('#fotoramag').fotorama();
                var fotoramag = $fotoramagDiv.data('fotorama');
                room.photos.forEach(function(photo) {
                    fotoramag.push({
                        img: 'images/' + photo.source
                    });
                });
                galleryRoom = true;
                return;
            }
        });
        $('.boton-index').hide();
        $(".boton-index2").show();
        var height = $("#content").height();
        $("#content").animate({
            bottom: height - 65
        }, 'fast');
        $(".top").animate({
            top: '-25px'
        }, 'fast');
    }
});

app.controller('serviciosController', function($scope, $http) {
    checkGallery();
    fotorama.show(2);
    activeMenu(3);
    $scope.breadcrumbs = 'Servicios / ';
    $http.get('site/loadServices').success(function(response) {
        $scope.services = [];
        $scope.services2 = [];
        response.forEach(function(s) {
            if (s.description === null && s.photos[0] == null) {
                $scope.services2.push(s);
            } else {
                $scope.services.push(s);
            }
        });
        services = $scope.services;
        toggleGallery(false);
    });
});
app.controller('servicioController', function($scope, $routeParams, $http) {
    $scope.$parent.breadcrumbs = 'Servicios / ' + $routeParams.name;
    if (typeof services === 'undefined') {
        $http.get('site/loadServices').success(function(response) {
            services = [];
            response.forEach(function(s) {
                if (s.description !== null) {
                    services.push(s);
                }
            });
            services.forEach(function(service) {
                if (service.title === $routeParams.name) {
                    $scope.service = service;
                    return;
                }
            });
        });
    } else {
        services.forEach(function(service) {
            if (service.title === $routeParams.name) {
                $scope.service = service;
                return;
            }
        });
    }
    $scope.viewGallery = function(id) {
        services.forEach(function(service) {
            if (service.id == id) {
                fotorama.splice(2, 1, {
                    html: '<div id="fotoramag" data-auto="false" data-nav="thumbs" data-width="100%" data-height="100%" data-fit="cover"></div>'
                });
                var $fotoramagDiv = $('#fotoramag').fotorama();
                var fotoramag = $fotoramagDiv.data('fotorama');
                service.photos.forEach(function(photo) {
                    fotoramag.push({
                        img: 'images/' + photo.source
                    });
                });
                galleryService = true;
                return;
            }
        });
        $('.boton-index').hide();
        $(".boton-index2").show();
        var height = $("#content").height();
        $("#content").animate({
            bottom: height - 65
        }, 'fast');
        $(".top").animate({
            top: '-25px'
        }, 'fast');
    }
});

app.controller('ubicacionController', function() {
    checkGallery();
    fotorama.show(3);
    activeMenu(4);
    toggleGallery(false);
});

app.controller('loginController', function() {
    checkGallery();
    fotorama.show(4);
    activeMenu(5);
});
app.controller('registroController', function() {
    checkGallery();
    fotorama.show(5);
    activeMenu(6);
});


function toggleGallery(nav) {
    $(".boton-index2").hide();
    $(".fotorama__nav-wrap").hide();
    $(".boton-index").click(function() {
        $(this).hide();
        $(".boton-index2").show();
        var height = $("#content").height();
        $("#content").animate({
            bottom: height - 65
        }, 'fast');
        $(".top").animate({
            top: '-25px'
        }, 'fast');
        if (nav) {
            $(".fotorama__nav-wrap").fadeIn();
        }
    });
    $(".boton-index2").click(function() {
        $(".top").animate({
            top: '0px'
        }, 'fast');
        $(this).hide();
        $(".boton-index").show();
        $("#content").animate({
            bottom: '0px'
        }, 'fast');
        $(".fotorama__nav-wrap").fadeOut();
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

function checkGallery() {
    if (galleryRoom) {
        fotorama.splice(1, 1, {
            img: 'images/fondo.jpg'
        });
        galleryRoom = false;
    }
    if (galleryService) {
        fotorama.splice(2, 1, {
            img: 'images/fondo2.jpg'
        });
        galleryService = false;
    }
}

function activeMenu(num) {
    for (var i = 1; i <= 6; i++) {
        if (i == num) {
            $('.m' + i).addClass('hover-menu' + i);
        } else {
            $('.m' + i).removeClass('hover-menu' + i);
        }
    };
}

$(document).ready(function() {
    $('.tooltip').tooltipster();
    interval = setInterval(loadMap, 1000);
    $fotoramaDiv = $('.fotorama').fotorama();
    fotorama = $fotoramaDiv.data('fotorama');
    fotorama.load([{
        img: 'images/fondo5.jpg'
    }, {
        img: 'images/fondo.jpg'
    }, {
        img: 'images/fondo2.jpg'
    }, {
        html: '<div id="map" style="height:100%"></div>'
    }, {
        img: 'images/fondo2.jpg'
    }, {
        img: 'images/fondo5.jpg'
    }]).setOptions({
        arrows: false,
        click: false,
        swipe: false
    });
    gallery = false;
});
