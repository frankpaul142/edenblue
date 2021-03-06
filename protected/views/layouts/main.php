<?php /* @var $this Controller */
$currentLang = Yii::app()->language;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/style.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/stylelog.css" rel="stylesheet" type="text/css" />
        <!-- Phone -->
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/mediaquery-phone.css" rel="stylesheet" type="text/css" media="only screen and (max-width:310px)" />
        <!-- Phone2 -->
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/mediaquery-phone2.css" rel="stylesheet" type="text/css" media="only screen and (min-width:311px) and (max-width:416px)" />
        <!-- Tablet -->
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/mediaquery-tablet.css" rel="stylesheet" type="text/css" media="only screen and (min-width:417px) and (max-width:630px)" />
        <!-- Desktop -->
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/mediaquery-desktop.css" rel="stylesheet" type="text/css" media="only screen and (min-width:630px)" />

        <title><?php echo CHtml::encode($this->pageTitle); ?></title>

        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js/jquery.ui.datepicker-es.js"></script>
        <link  href="//cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama.css" rel="stylesheet"/> <!-- 3 KB -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>

        <script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-5567008-38', 'auto');
		  ga('send', 'pageview');

		</script>

    </head>

    <body ng-app="EdenBlue">

        <div class="background">
            <div class="fotorama"
                 data-auto="false"
                 data-nav="false"
                 data-width="100%"
                 data-height="100%"
                 data-fit="cover"
                 data-thumbfit='cover'
                 >
            </div>
        </div>

        <div class="top">
            <div class="lenguaje">
                <div class="lenguaje-btn<?php if($currentLang=='es') echo ' hover-menu8'; ?>" id="es">ESP</div>
                <div class="lenguaje-btn<?php if($currentLang=='en') echo ' hover-menu9'; ?>" id="en">ENG</div>
            </div>
            <div class="log-in">
                <?php if (!isset(Yii::app()->user->id)) { ?>
                <a href="#registro"><div class="btn-regis m7">REGÍSTRATE</div></a>
                <a href="#reservar"><div class="btn-res">RESERVACIONES</div></a>
                <a href="#contacto"><div class="btn-cont">CONTACTO</div></a>
                <a href="#login"><div class="btn-login m6">INICIA SESIÓN</div></a>
         
                <?php } else { ?>
                <a href="#reservar"><div class="btn-res">RESERVACIONES</div></a>
                <a href="#contacto"><div class="btn-cont">CONTACTO</div></a>
                <a href="#cuenta"><div class="btn-login m6"><?php echo Yii::app()->user->name; ?></div></a>
                <a href="<?php echo Yii::app()->request->baseUrl; ?>/site/logout"><div class="btn-regis">CERRAR SESIÓN</div></a>
                <?php } ?>
            </div>
        </div>
        <div id="content">
            <?php echo $content; ?>
        </div>

        <div class="footer">
            <div class="social-cont">
                <div class="facebook"></div>
                <div class="instagram"></div>         
                <div class="twitter"></div>    		  
            </div>
            <div class="copyright">Todos los derechos reservados 2014 - Share - Quito - Ecuador</div>
        </div>    

        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular-route.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular-route-segment/1.3.0/angular-route-segment.min.js"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js/app.js"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js/directives.js"></script>
    </body>
</html>
