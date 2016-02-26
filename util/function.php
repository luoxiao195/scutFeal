<?php
	function changeSql($str)
	{
		$first=str_replace('\'','1',$str);
		$second=str_replace('--','1', $first);
		$third=str_replace('"', '1', $second);
		return $third;
	}
	/**
	* 处理图片上传删除所用的类
	*/
	class picture
	{
		
		function upload($_FILES)				//用于上传图片
		{
			$domain="fealimg";
			$max_file_size=2000000;
			$upload_dir="saestor://".$domain."/img/";
			if(!is_dir($upload_dir))			//如果不存在，则创建一个,权限为0700
			{
				mkdir($upload_dir,0700);
			}
			if($_FILES['file']['error']>0)
			{
				$return=array('data'=>'','codes'=>356);
				return $return;
			}
			else
			{
				if($_FILES['file']['type']=='image/gif'
					||$_FILES['file']['type']=='image/jpg'
					||$_FILES['file']['type']=='image/jpeg'
					||$_FILES['file']['type']=='image/pjpeg'
					||$_FILES['file']['type']=='image/png'
					||$_FILES['file']['type']=='image/bmp'
					||$_FILES['file']['type']=='image/x-png')			//图片是否符合格式
				{
					if($max_file_size>=$_FILES['file']['size'])
					{
						$fileName=$_FILES['file']['name'];
						if(is_file($upload_dir.$fileName))				//判断文件是否已存在
						{
							$return=array('data'=>'','codes'=>359);
							return $return;
						}
						if(move_uploaded_file($_FILES['file']['tmp_name'], $upload_dir.$fileName))
						{
							$url="http://scutfeal-fealimg.stor.sinaapp.com/img/".$fileName;
							$return=array('data'=>$url,'codes'=>200);
							return $return;
						}
						else
						{
							$return=array('data'=>'','codes'=>700);
							return $return;
						}
					}
					else
					{
						$return=array('data'=>'','codes'=>358);
						return $return;
					}
				}
				else
				{
					$return=array('data'=>$_FILES['file']['type'],'codes'=>357);
					return $return;
				}

			}
		}
		function rmPicture($pictureName)				//删除图片
		{
			$domain="fealimg";
			$upload_dir="saestor://".$domain."/img/";
			if(unlink($upload_dir.$pictureName))
			{
				$return=array('data'=>'','codes'=>200);
				return $return;
			}
			else
			{
				$return=array('data'=>'','codes'=>700);
				return $return;
			}
		}
	}
	
