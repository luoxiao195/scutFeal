<?php
	function validCode()
	{
		header("Content-Type:image/png");  
		$code="";
		$arr = array();  
	    for($i=0;$i<4;$i++)
	    {
	        $arr[$i] = rand(0,9);  
	        $code .= (string)$arr[$i];  
	    }  

		$_SESSION["validCode"]=$code;

		//绘图
		$width=100;
		$height=25;

		$img=imagecreatetruecolor($width,$height);

		$backclor=imagecolorallocate($img, 255, 255, 255);
		imagefill($img,0,0,$backclor);

		for($i=0;$i<4;$i++)
		{
			$textColor=imagecolorallocate($img,rand(0,80),rand(0,80),rand(0,80));
			imagechar($img,12,7+$i*25,3,(string)$arr[$i],$textColor);
		}
		imagepng($img);

		imagedestroy($img);
		return $code;
	}
	//validCode();