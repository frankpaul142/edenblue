<div class="cont1-reserv">
	<form action="site/book" method="post">
		<div class="reserv-tit">RESERVACIONES</div>
		<div class="fondodeg-reserv">
			<div class="reserv-inout">Errores:
				<?php if(isset($_SESSION['noAvailable'])){
					print_r($_SESSION['noAvailable']);
					/*foreach ($_SESSION['noAvailable'] as $i => $error) {
						echo $error.'<br>';
					}*/
				} ?>
			</div>
			<div class="reserv-inout">
				<div class="reserv-in">
					<div class="reserv-in-txt">
						<input type="text" name="llegada" placeholder="LLEGADA" id="datepickerl" ng-model="llegada" ng-change="calcular()" required />
					</div>
				</div>
				<div class="reserv-out">
					<div class="reserv-out-txt">
						<input type="text" name="salida" placeholder="SALIDA" id="datepickers" ng-model="salida" ng-change="calcular()" required />
					</div>
				</div>
			</div>
			<div class="reserv-coti">
				<div class="reserv-numhab">
					<div id="rooms">
                        <div class="reserv-numhab-txt">Habitaciones</div>
                        <select id="floatright" name="habitaciones" ng-model="numero" ng-change="habitaciones()" required>
                            <option ng-repeat="a in range(5) track by $index" value="{{ $index+1 }}">{{ $index+1 }}</option>
                        </select>
                    </div>
				</div>
				<div compileroom="hab"></div>
				<div class="max-personas">Nº Máximo Personas: {{ maxPersonas }}</div>
				<input type="hidden" name="maxPersonas" value="{{ maxPersonas }}" />
				<div class="subtot">
					<div class="subtot-cont">_________</div>
					<div class="subtot-cont">
						<div class="subtot-center-top">SUBTOTAL</div>
						<div class="subtot-center-mid">
							<label>{{ subtotal | currency }}</label>
						</div>
						<div class="subtot-center-bot">+ {{ impuestos | currency }} (IMP)</div>
					</div>
					<div class="subtot-cont">_________</div>
				</div>
			</div>
		</div>
		<div class="reserv-total">TOTAL=
			<label>{{ total | currency }}</label>
			<input type="hidden" name="total" value="{{ total }}" />
		</div>
		<input type="submit" value="&#8226; Reservar &#8226;" />
	</form>
</div>
<script>
$(function() {
	$("#datepickerl").datepicker({
		minDate: 0,
		onClose: function(selectedDate) {
			$("#datepickers").datepicker("option", "minDate", selectedDate);
		}
	});
	$("#datepickers").datepicker({
		onClose: function(selectedDate) {
			$("#datepickerl").datepicker("option", "maxDate", selectedDate);
		}
	});
	//$.datepicker.setDefaults( $.datepicker.regional[ "es" ] );
});
</script>
