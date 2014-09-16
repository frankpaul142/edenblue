<?php
/* @var $this SiteController */

$this->pageTitle = Yii::app()->name;
?>

<div class="logo">
    <a href="#">
        <img src="<?php echo Yii::app()->request->getBaseUrl(true); ?>/images/logo-01.png" width="154" height="112" />
    </a>
</div>
<div class="menu">
    <a href="#reservar"><div class="m1"></div></a>
    <a href="#hosteria"><div class="m2"></div></a>
    <a href="#servicios"><div class="m3"></div></a>
    <a href="#ubicacion"><div class="m4"></div></a>
    <a href="#"><div class="m5"></div></a>

</div>
<div class="contenidos">
    <div app-view-segment="0"></div>
</div>	