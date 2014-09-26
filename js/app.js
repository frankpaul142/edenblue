var app = angular.module('EdenBlue', ['ngRoute', 'route-segment', 'view-segment', 'myApp.directives', 'ngSanitize']);

app.config(function($routeSegmentProvider, $routeProvider) {
    $routeSegmentProvider.
    when('/', 'hosteria').
    when('/reservar', 'reservar').
    when('/hosteria', 'hosteria').
    when('/hosteria/infraestructura', 'hosteria.infraestructura').
    when('/hosteria/entorno', 'hosteria.entorno').
    when('/hosteria/habitaciones', 'hosteria.habitaciones').
    when('/hosteria/habitaciones/:id', 'hosteria.habitaciones').
    when('/servicios', 'servicios').
    when('/servicios/:name', 'servicios.servicio').
    when('/ubicacion', 'ubicacion').
    when('/contacto', 'contacto').
    when('/login', 'login').
    when('/login/:error', 'login').
    when('/registro', 'registro').
    when('/registro/:error', 'registro').
    when('/cuenta', 'cuenta').
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
    segment('contacto', {
        templateUrl: 'templates/_contacto.html',
        controller: 'contactoController'
    }).
    segment('login', {
        templateUrl: 'templates/_login.html',
        controller: 'loginController'
    }).
    segment('registro', {
        templateUrl: 'templates/_registro.html',
        controller: 'registroController'
    }).
    segment('cuenta', {
        templateUrl: 'templates/_cuenta.html',
        controller: 'cuentaController'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

var $fotoramaDiv;
var fotorama;
var rooms;
var services;
var services2;
var galleryRoom;
var galleryService;

app.controller('reservarController', function($scope, $http, $compile, $sce) {
    checkGallery();
    fotorama.show(0);
    activeMenu(1);
    $scope.numero = 1;
    $scope.ninos = 0;
    $scope.adultos = 1;
    $scope.subtotal = $scope.ninos * 10 + $scope.adultos * 12;
    $scope.impuestos = $scope.subtotal * 0.12;
    $scope.total = parseFloat($scope.subtotal) + parseFloat($scope.impuestos);
    if (typeof rooms === 'undefined') {
        $http.get('site/loadTypeRooms').success(function(response) {
            $scope.rooms = response;
            rooms = $scope.rooms;
        });
    } else {
        $scope.rooms = rooms;
    }
    $scope.calcular = function() {
        $scope.subtotal = $scope.ninos * 10 + $scope.adultos * 12;
        if (typeof $scope.habitacion !== 'undefined') {
            for (var i = 1; i <= $scope.numero; i++) {
                if (typeof $scope.habitacion[i] !== 'undefined') {
                    $scope.subtotal += parseFloat($scope.habitacion[i].price);
                }
            }
        }
        $scope.impuestos = $scope.subtotal * 0.12;
        $scope.total = parseFloat($scope.subtotal) + parseFloat($scope.impuestos);
    }
    $scope.habitaciones = function() {
        if ($scope.numero >= 1 && $scope.numero <= 5) {
            $scope.calcular();
        } else {
            $scope.subtotal = 0;
            $scope.impuestos = 0;
            $scope.total = 0;
        }
    }
});

app.controller('hosteriaController', function() {
    checkGallery();
    toggleGallery();
    fotorama.show(1);
    activeMenu(2);
});
app.controller('infraestructuraController', function($scope) {
    $scope.$parent.breadcrumbs = 'Hostería / Infraestructura';
    $scope.$parent.ancla = '';
});
app.controller('entornoController', function($scope) {
    $scope.$parent.breadcrumbs = 'Hostería / Entorno';
    $scope.$parent.ancla = '';
});
app.controller('habitacionesController', function($scope, $http, $routeParams, $sce) {
    $scope.loading = true;
    $scope.$parent.breadcrumbs = 'Hostería / Habitaciones';
    var html = '<div class="anchor-select">';
    if (typeof rooms === 'undefined') {
        $http.get('site/loadTypeRooms').success(function(response) {
            $scope.rooms = response;
            rooms = $scope.rooms;
            rooms.forEach(function(room) {
                html += '<a href="#hosteria/habitaciones#h' + room.id + '"><div class="anchor">' + room.name + '</div></a>';
            });
            html += '</div>';
            $scope.$parent.ancla = $sce.trustAsHtml(html);
            $scope.loading = false;
        });
    } else {
        $scope.rooms = rooms;
        rooms.forEach(function(room) {
            html += '<a href="#hosteria/habitaciones#h' + room.id + '"><div class="anchor">' + room.name + '</div></a>';
        });
        html += '</div>';
        $scope.$parent.ancla = $sce.trustAsHtml(html);
        $scope.loading = false;
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
    };
});

app.controller('serviciosController', function($scope, $http) {
    $scope.loading = true;
    checkGallery();
    fotorama.show(2);
    activeMenu(3);
    $scope.breadcrumbs = 'Servicios / ';
    $scope.services = [];
    $scope.services2 = [];
    if (typeof services === 'undefined') {
        $http.get('site/loadServices').success(function(response) {
            response.forEach(function(s) {
                if ((s.description == null || s.description.substr(0, 8) == "service_") && s.photos[0] == null) {
                    $scope.services2.push(s);
                } else {
                    $scope.services.push(s);
                }
            });
            services = $scope.services;
            services2 = $scope.services2;
            $scope.loading = false;
        });
    } else {
        $scope.services = services;
        $scope.services2 = services2;
        $scope.loading = false;
    }
    toggleGallery();
});
app.controller('servicioController', function($scope, $routeParams, $timeout) {
    $scope.$parent.breadcrumbs = 'Servicios / ' + $routeParams.name;
    serv();

    function serv() {
        if (typeof services === 'undefined') {
            $timeout(serv, 500);
        } else {
            services.forEach(function(service) {
                if (service.title === $routeParams.name) {
                    $scope.service = service;
                    return;
                }
            });
        }
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
    toggleGallery();
});

app.controller('contactoController', function() {
    checkGallery();
    fotorama.show(4);
    activeMenu(5);
});

app.controller('loginController', function($scope, $routeParams) {
    checkGallery();
    fotorama.show(5);
    activeMenu(6);
    if (typeof $routeParams.error !== 'undefined') {
        $scope.errors = 'Combinación de Email y Contraseña incorrecta';
    }
});

app.controller('registroController', function($scope, $routeParams) {
    checkGallery();
    fotorama.show(6);
    activeMenu(7);
    if (typeof $routeParams.error !== 'undefined') {
        switch ($routeParams.error) {
            case 'nocoinciden':
                $scope.errors = 'No coinciden las contraseñas';
                break;
            case 'yaexiste':
                $scope.errors = 'Ya existe un usuario con ese email registrado';
                break;
            case 'errorlogin':
            case 'error':
                $scope.errors = 'Se produjo un error, inténtelo de nuevo por favor.';
                break;
        }
    }
});
app.controller('registro', function() {

});

app.controller('cuentaController', function() {
    checkGallery();
    fotorama.show(5);
    activeMenu(6);
});


function toggleGallery() {
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
        var latlong = new google.maps.LatLng(0.287006, -80.030862);
        var centerll = new google.maps.LatLng(0.224522, -79.901086);
        var options = {
            center: centerll,
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var mapa = new google.maps.Map(mapDiv, options);
        var marker = new google.maps.Marker({
            position: latlong,
            map: mapa,
            title: 'EdenBlue'
        });
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
    for (var i = 1; i <= 7; i++) {
        if (i == num) {
            $('.m' + i).addClass('hover-menu' + i);
        } else {
            $('.m' + i).removeClass('hover-menu' + i);
        }
    };
}

$(document).ready(function() {
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
        img: 'images/fondo3.jpg'
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

    $('.lenguaje-btn').click(function() {
        console.log($(this).attr('id'));
        var form = $('<form action="site/setLanguage" method="post">' +
            '<input type="hidden" name="language" value="' + $(this).attr('id') + '" />' +
            '<input type="hidden" name="url" value="' + document.URL + '" />' +
            '</form>');
        $('body').append(form);
        $(form).submit();
    });

});
