var app = angular.module('EdenBlue', ['ngRoute', 'route-segment', 'view-segment', 'myApp.directives']);

app.config(function($routeSegmentProvider, $routeProvider) {
	$routeSegmentProvider.
	when('/', 'hosteria').
	when('/reservar', 'reservar').
	when('/pagar', 'pagar').
	when('/hosteria', 'hosteria').
	when('/hosteria/infraestructura', 'hosteria.infraestructura').
	when('/hosteria/entorno', 'hosteria.entorno').
	when('/hosteria/habitaciones', 'hosteria.habitaciones').
	when('/hosteria/habitaciones/:id', 'hosteria.habitaciones').
	when('/hosteria/tarifas', 'hosteria.tarifas').
	when('/servicios', 'servicios').
	when('/servicios/:name', 'servicios.servicio').
	when('/ubicacion', 'ubicacion').
	when('/contacto', 'contacto').
	when('/contacto/:param', 'contacto').
	when('/login', 'login').
	when('/login/:param', 'login').
	when('/registro', 'registro').
	when('/registro/:error', 'registro').
	when('/cuenta', 'cuenta').
	when('/ecosistema/:from', 'ecosistema').
	segment('reservar', {
		templateUrl: 'templates/_reservar.html',
		controller: 'reservarController'
	}).
	segment('pagar', {
		templateUrl: 'templates/_pagar.php',
		controller: 'pagarController'
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
	segment('tarifas', {
		templateUrl: 'templates/hosteria/_tarifas.html',
		controller: 'tarifasController'
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
	}).
	segment('ecosistema', {
		templateUrl: 'templates/_ecosistema.html',
		controller: 'ecosistemaController'
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
var infr;

app.controller('reservarController', function($scope, $http) {
	var vImp = 0.12;
	var dias = 1;
	checkGallery();
	fotorama.show(0);
	activeMenu(1);
	$scope.loading = false;
	$scope.first = true;
	$scope.maxHabitaciones = 5;
	//$scope.start = 1;
	//$scope.end = 1;
	$scope.numero = 1;
	//$scope.personas = 1;
	$scope.habitacion = [];
	$scope.maxPersonas = 0;
	calcularTotal(0);
	$scope.range = function(n) {
		return new Array(n);
	};
	$scope.fechas = function() {
		if (typeof $scope.llegada !== 'undefined' && typeof $scope.salida !== 'undefined') {
			$scope.loading = true;
			$scope.numero = 1;
			calcularTotal(0);
			var xsrf = $.param({
				dateArrive: $scope.llegada,
				dateDeparture: $scope.salida
			});
			$http({
				method: 'POST',
				url: 'site/available',
				data: xsrf,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function(response) {
				if (response != '') {
					$scope.first = false;
					$scope.loading = false;
					$scope.disponibles = response;
					var max = 0;
					for (i in $scope.disponibles) {
						if ($scope.disponibles[i] > max) {
							max = $scope.disponibles[i];
						}
					}
					$scope.maxHabitaciones = max;
					$scope.habitaciones();
				}
			});
		}
	}
	$scope.calcular = function() {
		var _MS_PER_DAY = 1000 * 60 * 60 * 24;
		var a = new Date($scope.llegada);
		var b = new Date($scope.salida);
		var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) + 1;
		dias = Math.ceil((utc2 - utc1) / _MS_PER_DAY);
		if (dias > 1) {
			dias--;
		}
		$scope.subtotal = 0;
		if (typeof $scope.habitacion !== 'undefined') {
			$scope.maxPersonas = 0;
			for (var i = 1; i <= $scope.numero; i++) {
				if (typeof $scope.habitacion[i] !== 'undefined') {
					$scope.subtotal += parseFloat($scope.habitacion[i].price) * dias;
					$scope.maxPersonas += parseInt($scope.habitacion[i].capacity);
				}
			}
		} else {
			console.log('undefined');
		}
		calcularTotal($scope.subtotal);
	}
	$scope.habitaciones = function() {
		if ($scope.numero >= 1 && $scope.numero <= $scope.maxHabitaciones) {
			var html = '';
			$scope.disponiblesT = [];
			for (var i = 1; i <= $scope.numero; i++) {
				$scope.disponiblesT[i] = copy($scope.disponibles);
				for (var j in $scope.disponiblesT[i]) {
					$scope.disponiblesT[i][j] -= i - 1;
				}
				for (var k in rooms) {
					if ($scope.disponiblesT[i][rooms[k].id] > 0) {
						$scope.habitacion[i] = rooms[k];
						break;
					}
				}
				html += '<div class="reserv-tipohab">' +
					'<div class="reserv-tipohab-top">' +
					'<div class="reserv-tipohab-top-txt">Tipo de Habitación</div>' +
					'<select ' +
					'class="reserv-tipohab-top-btn" ' +
					'ng-model="habitacion[' + i + ']" ' +
					'ng-options="room.name for room in rooms" ' +
					'ng-change="calcular()" ' +
					'options-disabled="disponiblesT[' + i + '][room.id]<1 for room in rooms"' +
					'required>' +
					'</select>' +
					'<input type="hidden" name="habitacion[' + i + ']" value="{{ habitacion[' + i + '].name }}" />' +
					'<input type="hidden" name="room[' + i + ']" value="{{ habitacion[' + i + '].id }}" />' +
					'</div>' +
					'</div>';
			}
			$scope.hab = html;
			$scope.calcular();
		} else {
			calcularTotal(0);
		}
	}
	if (typeof rooms === 'undefined') {
		$http.get('site/loadTypeRooms').success(function(response) {
			$scope.rooms = response;
			rooms = $scope.rooms;

		});
	} else {
		$scope.rooms = rooms;
	}

	function calcularTotal(subtotal) {
		$scope.subtotal = subtotal;
		$scope.impuestos = $scope.subtotal * vImp;
		$scope.total = parseFloat($scope.subtotal) + parseFloat($scope.impuestos);
	}

	function copy(o) {
		var out, v, key;
		out = Array.isArray(o) ? [] : {};
		for (key in o) {
			v = o[key];
			out[key] = (typeof v === "object") ? copy(v) : v;
		}
		return out;
	}
});
app.controller('pagarController', function() {

});

app.controller('hosteriaController', function() {
	checkGallery();
	toggleGallery();
	fotorama.show(1);
	activeMenu(2);
});
app.controller('infraestructuraController', function($scope, $http) {
	$scope.loading = true;
	$scope.$parent.breadcrumbs = 'Hostería / Infraestructura';
	$scope.$parent.ancla = '';
	$scope.infr=[];
	toggleGallery();
	if (typeof(infr) === 'undefined') {
		$http.get('site/loadInfrastructure').success(function(response) {
			$scope.infr.title = response['title'];
			$scope.infr.description = response['description'];
			$scope.infr.photos = response['photos'];
			infr=$scope.infr;
			$scope.loading = false;
		});
	}
	else{
		$scope.infr=infr;
		$scope.loading = false;
	}
	$scope.viewGallery = function() {
		fotorama.splice(1, 1, {
			html: '<div id="fotoramag" data-auto="false" data-nav="thumbs" data-width="100%" data-height="100%" data-fit="cover"></div>'
		});
		galleryRoom = true;
		var $fotoramagDiv = $('#fotoramag').fotorama();
		var fotoramag = $fotoramagDiv.data('fotorama');
		$scope.infr.photos.forEach(function(photo) {
			fotoramag.push({
				img: 'images/' + photo.source
			});
		});
		$('.footer').fadeOut('fast');
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
app.controller('entornoController', function($scope) {
	$scope.$parent.breadcrumbs = 'Hostería / Entorno';
	$scope.$parent.ancla = '';
});
app.controller('habitacionesController', function($scope, $http, $anchorScroll) {
	$scope.loading = true;
	$scope.$parent.breadcrumbs = 'Hostería / Habitaciones';
	var html = '<div class="anchor-select">';
	if (typeof rooms === 'undefined') {
		$http.get('site/loadTypeRooms').success(function(response) {
			$scope.rooms = response;
			rooms = $scope.rooms;
			rooms.forEach(function(room) {
				html += '<div class="anchor" ng-click="goTo(\'h' + room.id + '\')">' + room.name + '</div>';
			});
			html += '</div>';
			$scope.$parent.ancla = html;
			$scope.loading = false;
		});
	} else {
		$scope.rooms = rooms;
		rooms.forEach(function(room) {
			html += '<div class="anchor" ng-click="goTo(\'h' + room.id + '\')">' + room.name + '</div>';
		});
		html += '</div>';
		$scope.$parent.ancla = html;
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
		$('.footer').fadeOut('fast');
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
app.controller('tarifasController', function($scope, $http) {
	$scope.loading = true;
	$scope.$parent.breadcrumbs = 'Hostería / Tarifas';
	$scope.$parent.ancla = '';
	if (typeof rooms === 'undefined') {
		$http.get('site/loadTypeRooms').success(function(response) {
			$scope.rooms = response;
			rooms = $scope.rooms;
			$scope.loading = false;
		});
	} else {
		$scope.rooms = rooms;
		$scope.loading = false;
	}
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
		$('.footer').fadeOut('fast');
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

app.controller('contactoController', function($scope, $routeParams) {
	$scope.enviado = false;
	checkGallery();
	fotorama.show(4);
	activeMenu(5);
	toggleGallery();
	if (typeof $routeParams.param !== 'undefined') {
		if ($routeParams.param == 'error') {
			$scope.mensaje = 'Hubo un error al enviar. Intente de nuevo por favor.';
		} else if ($routeParams.param == 'enviado') {
			$scope.mensaje = 'Gracias por contactarnos. En seguida procesaremos su solicitud.';
			$scope.enviado = true;
		}
	}
});

app.controller('loginController', function($scope, $routeParams) {
	checkGallery();
	fotorama.show(5);
	activeMenu(6);
	if (typeof $routeParams.param !== 'undefined') {
		if ($routeParams.param == 'error') {
			$scope.errors = 'Combinación de Email y Contraseña incorrecta';
		} else if ($routeParams.param == 'rp') {
			$scope.redirect = $routeParams.param;
		} else if ($routeParams.param == 'errorrp') {
			$scope.errors = 'Combinación de Email y Contraseña incorrecta';
			$scope.redirect = 'rp';
		}
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

app.controller('cuentaController', function($scope, $http) {
	$scope.loading = true;
	checkGallery();
	fotorama.show(5);
	activeMenu(6);
	toggleGallery();
	$http.get('site/loadAccount').success(function(response) {
		$scope.name = response['name'];
		$scope.lastname = response['lastname'];
		$scope.reservations = response['reservations'];
		$scope.loading = false;
	});
});

app.controller('ecosistemaController', function($scope, $http, $routeParams) {
	toggleGallery();
	$scope.title = '...';
	$scope.description = '...';
	//$scope.from=$routeParams.from;
	$http.get('site/loadEcosystem').success(function(response) {
		$scope.title = response['title'];
		$scope.description = response['description'];
		$scope.photos = response['photos'];
	});
	$scope.viewGallery = function() {
		if ($routeParams.from == 'en') {
			fotorama.splice(1, 1, {
				html: '<div id="fotoramag" data-auto="false" data-nav="thumbs" data-width="100%" data-height="100%" data-fit="cover"></div>'
			});
			galleryRoom = true;
		} else {
			fotorama.splice(2, 1, {
				html: '<div id="fotoramag" data-auto="false" data-nav="thumbs" data-width="100%" data-height="100%" data-fit="cover"></div>'
			});
			galleryService = true;
		}
		var $fotoramagDiv = $('#fotoramag').fotorama();
		var fotoramag = $fotoramagDiv.data('fotorama');
		$scope.photos.forEach(function(photo) {
			fotoramag.push({
				img: 'images/' + photo.source
			});
		});
		$('.footer').fadeOut('fast');
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


function toggleGallery() {
	$("#regresar").hide();
	$(".boton-index2").hide();
	$(".fotorama__nav-wrap").hide();
	$(".boton-index").click(function() {
		$(this).hide();

		$(".footer").fadeOut("fast");
		$("#regresar").fadeTo("fast", 1);
		$(".boton-index2").show();
		var height = $("#content").height();
		$("#content").animate({
			bottom: height - 65
		}, 'fast');
		$(".top").animate({
			top: '-25px'
		}, 'fast');
	});
	$("#regresar").click(function() {
		$(this).fadeTo("fast", 0);
		$(".footer").fadeIn("fast");
		$(".top").animate({
			top: '0px'
		}, 'fast');
		$(".boton-index2").hide();
		$(".boton-index").show();
		$("#content").animate({
			bottom: '0px'
		}, 'fast');
		$(".fotorama__nav-wrap").fadeOut();
	});
	$(".boton-index2").click(function() {
		$("#regresar").fadeTo("fast", 0);
		$(".footer").fadeIn("fast");
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
var latlong;

function loadMap() {
	if (document.getElementById('map') !== null) {
		var directionsService1 = new google.maps.DirectionsService();
		var directionsService2 = new google.maps.DirectionsService();
		var directionsService3 = new google.maps.DirectionsService();
		var directionsService4 = new google.maps.DirectionsService();
		var directionsDisplay1 = new google.maps.DirectionsRenderer({
			polylineOptions: {
				strokeColor: "yellow"
			}
		});
		var directionsDisplay2 = new google.maps.DirectionsRenderer({
			polylineOptions: {
				strokeColor: "red"
			}
		});
		var directionsDisplay3 = new google.maps.DirectionsRenderer({
			polylineOptions: {
				strokeColor: "blue"
			}
		});
		var directionsDisplay4 = new google.maps.DirectionsRenderer({
			polylineOptions: {
				strokeColor: "green"
			}
		});
		var mapDiv = document.getElementById('map');
		latlong = new google.maps.LatLng(0.287006, -80.030862);
		//var centerll = new google.maps.LatLng(0.224522, -79.901086);
		var centerll = new google.maps.LatLng(0.044262, -79.288416);
		var options = {
			center: centerll,
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mapa = new google.maps.Map(mapDiv, options);
		directionsDisplay1.setMap(mapa);
		directionsDisplay2.setMap(mapa);
		directionsDisplay3.setMap(mapa);
		directionsDisplay4.setMap(mapa);
		var request1 = calcRoute('Quito', [
			[-0.466769, -78.586492],
			[-0.233375, -79.166847],
			[-0.003184, -79.391026],
			[0.070625, -80.053612]
		]);
		var request2 = calcRoute('Quito', [
			[-0.002935, -78.513786],
			[0.116637, -79.258513],
			[-0.003184, -79.391026],
			[0.070625, -80.053612]
		]);
		var request3 = calcRoute('Bahía de Caráquez', [
			[0.070625, -80.053612]
		]);
		var request4 = calcRoute('Quito', [
			[-0.466769, -78.586492],
			[-0.233375, -79.166847],
			[-0.271499, -79.464447],
			[0.070625, -80.053612]
		]);
		directionsService1.route(request1, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay1.setDirections(response);
			}
		});
		directionsService2.route(request2, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay2.setDirections(response);
			}
		});
		directionsService3.route(request3, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay3.setDirections(response);
			}
		});
		directionsService4.route(request4, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay4.setDirections(response);
			}
		});
		var marker = new google.maps.Marker({
			position: latlong,
			map: mapa,
			title: 'EdenBlue'
		});
		clearInterval(interval);
	}
}

function calcRoute(start, points) {
	var end = latlong;
	var waypts = [];
	for (p in points) {
		waypts.push({
			location: new google.maps.LatLng(points[p][0], points[p][1]),
			stopover: false
		});
	}
	var request = {
		origin: start,
		destination: end,
		waypoints: waypts,
		optimizeWaypoints: true,
		travelMode: google.maps.TravelMode.DRIVING
	};
	return request;
}

function checkGallery() {
	if (galleryRoom) {
		fotorama.splice(1, 1, {
			img: 'images/fondo9.jpg'
		});
		galleryRoom = false;
	}
	if (galleryService) {
		fotorama.splice(2, 1, {
			img: 'images/fondo8.jpg'
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
		img: 'images/fondo6.jpg'
	}, {
		img: 'images/fondo9.jpg'
	}, {
		img: 'images/fondo8.jpg'
	}, {
		html: '<div id="map" style="height:100%"></div>'
	}, {
		img: 'images/fondo7.jpg'
	}, {
		img: 'images/fondo11.jpg'
	}, {
		img: 'images/fondo10.jpg'
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
