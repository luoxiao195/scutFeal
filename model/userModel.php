<?php 
include 'connect.php';
/*
	userclass
	用于user模块的涉及数据库操作
*/
	class userModel
	{
		/*
		注册新用户，先验证邮箱是否已被占用
		*/
		function register($userName,$password,$email)
		{
			
			try{
				$query_email='select * from User where email="'.$email.'"';
				$data=mysql_query($query_email);
				$len=mysql_num_rows($data);
				if($len!=0)						//邮箱被占用
				{
					return array('data'=>null,'codes'=>'351');
				}
				$insert_user='insert into User (userName,userPassword,email) values (\''.$userName.'\',\''.md5($password).'\',"'.$email.'")';
				$insert_result=mysql_query($insert_user);
				if($insert_result)
					return array('data' =>null ,'codes'=>200);
				else
					return array('data'=>null,'codes'=>700);
			}
			catch(Exception $e)
			{
				return $e;
			}
		}
		/*
		用户登录
		*/
		function login($email,$password)
		{
			try{
				$login_sql='select * from User where email=\''.$email.'\' and userPassword=\''.md5($password).'\'';
				$result=mysql_query($login_sql);
				$len=mysql_num_rows($result);
				if($len!=0)
				{
					$data=mysql_fetch_array($result);
					return array('data'=>$data,'codes'=>200);
				}
				else
					return array('data'=>null,'codes'=>352);
			}
			catch(Exception $e)
			{
				return $e;
			}
		}
		function getInfo($userId)
		{
			$user_sql='SELECT userName,email,sex,phone,qq,regisTime FROM User WHERE userId=\''.$userId.'\'';
			try{
				$result=mysql_query($user_sql);
				if($result)
				{
					$data=mysql_fetch_array($result);
					return array('data' =>$data,'codes'=>200 );
				}	
				else
					return array('data'=>'','codes'=>700);
			}
			catch(Exception $e)
			{
				return $e;
			}
		}
		function updateInfo($userId,$userName,$newPw,$phone,$qq,$sex)
		{
			$pw_sql='SELECT * FROM User WHERE userId=\''.$userId.'\'';
			try{
				$if_right=mysql_query($pw_sql);
				$right=mysql_num_rows($if_right);
				$pw=md5($newPw);
				if($right)
				{
					$updateInfo='UPDATE User SET userName=\''.$userName.'\',userPassword=\''.$pw.'\',phone=\''.$phone.'\',qq=\''.$qq.'\',sex=\''.$sex.'\' WHERE userId=\''.$userId.'\'';
					$return=mysql_query($updateInfo);
					if($return)
					{
						return array('data'=>null,'codes'=>200);
					}
					else
						return array('data'=>null,'codes'=>700);
				}
				else
					return array('data'=>null,'codes'=>362);

			}
			catch(Exception $e)
			{
				return $e;
			}
				
		}

	}