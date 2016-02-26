<?php 
	session_start();
	$link=mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS) or die(mysql_errno());
	mysql_select_db(SAE_MYSQL_DB,$link);
	mysql_query("SET NAMES 'UTF-8'");
