<?php /* @var $this Controller */
$currentLang = Yii::app()->language;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> <!-- 33 KB -->
        <link  href="//fotorama.s3.amazonaws.com/4.6.2/fotorama.css" rel="stylesheet"/> <!-- 3 KB -->
        <script src="//fotorama.s3.amazonaws.com/4.6.2/fotorama.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>

    </head>

    <body ng-app="EdenBlue">

        <div class="background">
            <div class="fotorama"
                 data-auto="false"
                 data-nav="false"
                 data-width="100%"
                 data-height="100%"
                 data-fit="cover">
            </div>
        </div>

        <div class="top">
            <div class="lenguaje">
                <div class="lenguaje-btn<?php if($currentLang=='es') echo ' hover-menu8'; ?>" id="es">ESP</div>
                <div class="lenguaje-btn<?php if($currentLang=='en') echo ' hover-menu9'; ?>" id="en">ENG</div>
            </div>
            <div class="log-in">
                <?php if (!isset(Yii::app()->user->id)) { ?>
                <a href="#login"><div class="btn-login m6">INICIA SESIÓN</div></a>
                <a href="#registro"><div class="btn-regis m7">REGÍSTRATE</div></a>
                <?php } else { ?>
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
