<?php /* @var $this Controller */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/style.css" rel="stylesheet" type="text/css" />
        <!-- Phone -->
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/mediaquery-phone.css" rel="stylesheet" type="text/css" media="only screen and (max-width:310px)" />
        <!-- Phone2 -->
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/mediaquery-phone2.css" rel="stylesheet" type="text/css" media="only screen and (min-width:311px) and (max-width:416px)" />
        <!-- Tablet -->
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/mediaquery-tablet.css" rel="stylesheet" type="text/css" media="only screen and (min-width:417px) and (max-width:630px)" />
        <!-- Desktop -->
        <link href="<?php echo Yii::app()->request->baseUrl; ?>/css/mediaquery-desktop.css" rel="stylesheet" type="text/css" media="only screen and (min-width:630px)" />

        <title><?php echo CHtml::encode($this->pageTitle); ?></title>
    </head>

    <body class="fondo">

        <div>
            <div class="lenguaje">
                <div class="lenguaje-btn">ESP</div><div class="lenguaje-btn">ENG</div>
            </div>
            <div class="log-in">
                <div class="btn-login">INICIA SESIÓN</div>
                <div class="btn-regis">REGÍSTRATE</div>    
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

    </body>
</html>
