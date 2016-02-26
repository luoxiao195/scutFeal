<?php
//header("Location:control/indexControl.php");
require('control/indexControl.php');
$controller=new indexController();
$controller->index();
