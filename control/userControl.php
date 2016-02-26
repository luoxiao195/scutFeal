<?php
	include '../model/userModel.php';
	include '../util/token.php';
	include '../util/function.php';
	include '../util/validcode.php';

	$userModel=new userModel();

	if(!empty($_POST['request']))
		$req=$_POST['request'];
	else
		$req=1;
	/*
	以POST传入 $_POST['request']，根据类型决定调用方法
	*/
	switch ($req) 
	{
		case 'register':    // 注册新用户
			if(isset($_POST['vaildCode'])&&$_POST['vaildCode']==$_SESSION['validCode'])
			{
				$result=json_encode($userModel->register(changeSql($_POST['userName']),changeSql($_POST['password']),changeSql($_POST['email'])));
				echo $result;
			}
			else
			{
				$data=array('data'=>' ','codes'=>354);
				echo json_encode($data);
			}
			break;
		case 'login':
			if(isset($_POST['vaildCode'])&&$_POST['vaildCode']==$_SESSION['validCode'])							//校对验证码
			{
				if(!empty($_POST['email'])&&!empty($_POST['password']))
				{
					$login_result=$userModel->login(($_POST['email']),changeSql($_POST['password']));
					if($login_result['codes']==200)
					{

						$_SESSION['userId']=$login_result['data']['userId'];
						$return=array('data'=>array('userId'=>$_SESSION['userId'],'token'=>getToken($_SESSION['userId'])),'codes'=>200 );
						echo json_encode($return);
					}
					else
						echo json_encode($login_result);		
				}
				else
				{
					$return=array('data'=>null,'codes'=>353);
					echo json_encode(value);
				}
			}
			else
			{
				$data=array('data'=>'','codes'=>354);
				echo json_encode($data);
			}	
			break;
		case 'logout':
			if(isset($_POST['token'])&&isset($_SESSION['userId']))
			{
				if(validToken($_SESSION['userId'],$_POST['token']))
				{
					$_SESSION['userId']=null;
					$return=array('data'=>'','codes'=>200);
					echo json_encode($return);
				}
				else
				{
					$return=array('data'=>'','codes'=>355);
					echo json_encode($return);
				}
			}
			break;
		case 'center':
			if(isset($_POST['token'])&&isset($_SESSION['userId']))
			{
				if(validToken($_SESSION['userId'],$_POST['token']))
					echo json_encode(array('data'=>'','codes'=>200));
				else
				{

					echo json_encode(array('data'=>getToken($_SESSION['userId']),'codes'=>363));
				}
			}
			else
				echo json_encode(array('data'=>'','codes'=>360));
			break;
		case 'personInfo':
			if(isset($_POST['token'])&&isset($_SESSION['userId']))
			{
				$return=$userModel->getInfo($_SESSION['userId']);
				
				echo json_encode($return);
			}
			else
				echo json_encode(array('data'=>'','codes'=>360));
			break;
		case 'updateInfo':
			if(isset($_POST['token'])&&isset($_SESSION['userId'])&&validToken($_SESSION['userId'],$_POST['token']))
			{
				//需要使用changSql函数防注入
				$return=$userModel->updateInfo($_SESSION['userId'],
						changeSql($_POST['userName']),changeSql($_POST['newPw']),
						changeSql($_POST['phone']),changeSql($_POST['qq']),
						changeSql($_POST['sex']));
				echo json_encode($return);
			}
			else
				echo json_encode(array('data'=>'','codes'=>360));
			break;
		default:
			//echo "nothing happen";
			break;
	}
	if(isset($_GET['getValidCode']))			//输出验证码
	{
		validCode();
	}
