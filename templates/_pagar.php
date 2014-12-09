<?php session_start(); ?>
<div class="cont1-reserv">
	<div class="reserv-tit">PAGAR</div>
	<div class="fondodeg-reserv">
		<div class="reserv-inout">
			<div class="reserv-in">
				<div class="reserv-in-txt">
					Llegada: <?php if(isset($_SESSION['llegada'])) echo $_SESSION['llegada']; ?>
				</div>
			</div>
			<div class="reserv-out">
				<div class="reserv-out-txt">
					Salida: <?php if(isset($_SESSION['salida'])) echo $_SESSION['salida']; ?>
				</div>
			</div>
		</div>
		<div class="reserv-coti">
            <div class="reserv-numhab">
                <div class="reserv-tipohab-bot">
                    <div class="reserv-tipohab-bot-ninos">
                        <div class="reserv-tipohab-bot-ninos-txt">Nº Personas: <?php if(isset($_SESSION['personas'])) echo $_SESSION['personas']; ?></div>
                    </div>
                </div>
                <div class="reserv-numhab-1">Habitaciones: <?php if(isset($_SESSION['habitaciones'])) echo $_SESSION['habitaciones']; ?></div>
            </div>
            <div class="habitaciones-pay">
            	<?php if(isset($_SESSION['habitacion'])){
            		foreach ($_SESSION['habitacion'] as $i => $habitacion) {
            			echo $habitacion.'<br>';
            		}
            	} ?>
            </div>
        </div>
	</div>
    <div class="reserv-total">TOTAL: <?php if(isset($_SESSION['total'])) echo $_SESSION['total']; ?></div>
    <div class="reserv-btn">
        <input type="submit" value="&#8226; Pagar con PayPal &#8226;" />
    </div>
</div>