<?php
$fn = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);
$s=new SaeStorage();
$img=new SaeImage();
$img=file_get_contents('php://input');
if(strpos($fn,'.jpg')==true)
$name= 'pic'.microtime().'.jpg'; 
else $name= 'pic'.microtime().'.png'; 
$name=trimall($name);
$s->write('fealimg',$name,$img);
echo $name;
function trimall($str)//删除空格
{
    $qian=array(" ","　","\t","\n","\r");$hou=array("","","","","");
    return str_replace($qian,$hou,$str);    
}
?>
