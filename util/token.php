<?php
/*简陋的加密token*/
function getToken($id)
{
	$times=date('y-m-d-h');
	$token=md5($times[6]*10+$times[7]*9+$id);
	return $token;
}
function validToken($id,$token)
{
	$newToken=getToken($id);
	if($newToken==$token)
		return true;
	else
		return false;
}