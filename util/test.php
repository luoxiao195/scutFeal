<?php
include 'token.php';
echo getToken('57');

?>
<!DOCTYPE html>
<html>  
    <head>  
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>  
        <title>测试页面</title>  
       
    </head>  
    <body>  

        <form action='../control/goodControl.php' method="POST">
            <input type="submit" name="request"  value='goodInfo'/>
            <input type="hidden" name='token' value='28dd2c7955ce926456240b2ff0100bde' />
            <input type="hidden" name='goodId' value=10 />


        </form>
    </body>  
</html>  
