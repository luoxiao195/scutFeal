<?php
include 'connect.php';
class goodModel {
	/*
	 * 先插入good生成goodId，如果有图片，再调用处理图片的类插入goodImg,如果有标签，再插入goodLabel
	 */
	function addGood($goodName, $goodPrice, $goodType, $goodDesc, $label, $imgUrl, $userId) {
		try {
			$good_sql = 'INSERT INTO Good (goodName,goodPrice,goodType,goodDesc,userId) VALUES (\'' . $goodName . '\',\'' . $goodPrice . '\',\'' . $goodType . '\',\'' . $goodDesc . '\',\'' . $userId . '\')';
			
			$r1 = mysql_query ( $good_sql );
			if (! $r1)
				return array (
						'data' => '',
						'codes' => 101 
				);
			
			$goodId = mysql_insert_id (); // get the last insert message's id
			$label_sql = 'INSERT INTO goodLabel (goodId,content) VALUES (\'' . $goodId . '\',\'' . $label . '\')';
			$r2 = mysql_query ( $label_sql );
			if (! $r2)
				return array (
						'data' => '',
						'codes' => 102 
				);
			if (! empty ( $imgUrl ))
				foreach ( $imgUrl as $key => $value ) {
					$url = 'http://scutfeal-fealimg.stor.sinaapp.com/' . $value;
					$img_sql = 'INSERT INTO goodImg (goodId,imgUrl,imgName) VALUES (\'' . $goodId . '\',\'' . $url . '\',\'' . $value . '\')';
					$img_res = mysql_query ( $img_sql );
					if (! $img_sql)
						return array (
								'data' => '',
								'codes' => 103 
						);
				}
			return array (
					'data' => '',
					'codes' => 200 
			);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	function goodInfo($goodId,$sign,$userid) {
		$good_sql = 'SELECT userId,goodName,goodPrice,goodType,goodDesc,ifFinish,ReleaseTime FROM 
				Good WHERE goodId=\'' . $goodId . '\'';
		try {
			$good_r = mysql_query ( $good_sql );
			if (! empty ( $good_r )) {
				$hit_sql='UPDATE Good SET goodHit = goodHit + 1 WHERE goodId = \'' .$goodId. '\'';
				mysql_query ( $hit_sql );
				$return = mysql_fetch_array ( $good_r );
				
				// print_r($return);
				if ($return ['ifFinish'] == 0)
					$return ['ifFinish'] = '未结束';
				else
					$return ['ifFinish'] = '已结束';
				$return ['ReleaseTime'] = substr ( $return ['ReleaseTime'], 0, 10 );
				$label_sql = 'SELECT content FROM goodLabel WHERE goodId=\'' . $goodId . '\'';
				$label_r = mysql_query ( $label_sql );
				if (! empty ( $label_r )) {
					$label = mysql_fetch_array ( $label_r );
					$return ['label'] = $label ['content'];
				} else {
					$return ['label'] = 'none';
				}
				$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $goodId . '\'';
				$img_r = mysql_query ( $img_sql );
				if (! empty ( $img_r )) {
					$i = 0;
					while ( $img_row = mysql_fetch_array ( $img_r ) ) {
						$goodImg = $img_row ['imgUrl'];
						$return ['goodImg'] [$i] = $goodImg;
						$i ++;
					}
				} else {
					$return ['goodImg'] = 'none';
					$return['urlnum']=0;
				}
				/******************************************/
				$return['urlnum']=$i;
				$user_sql='SELECT userName,email,phone,qq FROM User WHERE userID = \''.$return['userId'].'\'';
				$user_r=mysql_query($user_sql);
				if(!empty($user_r))
				{
					$return['user']=mysql_fetch_array($user_r);
				}
				else $return['user']='none';
				$com_sql='SELECT u.userName,c.content,c.giveTime FROM User u,goodComment c WHERE c.goodId= \''
						.$goodId.'\' AND u.userId = c.commentOwnerId ORDER BY c.giveTime DESC';
				$com_r=mysql_query($com_sql);
				if(!empty($com_r))
				{
					$j = 0;
					while ( $com_row = mysql_fetch_array ( $com_r ) ) {
						$return ['comment'] [$j] = $com_row;
						$j ++;
					}
					$return['comnum']=$j;
				}
				else 
				{
					$return['comment']='none';
					$return['comnum']=0;
				}
				if($sign==1)
				{
				     $con_sql='SELECT * FROM goodConcerned WHERE goodId= \''.$goodId.'\' AND userId = \''.$userid.'\'';
				     $con_r=mysql_query($con_sql);
				     $num=mysql_num_rows($con_r);
				     if($num!=0)
				     {
				     	$return['concern']=1;
				     }
				     else $return['concern']=0;
				}
				/******************************************/
				return array (
						'data' => $return,
						'codes' => 200 
				);
			} else
				return array (
						'data' => $goodId,
						'codes' => 364 
				);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	//
	function topgood() {
		$good_sql = 'SELECT goodId,goodName,goodType,ReleaseTime,ifFinish FROM Good 
				order by ReleaseTime DESC limit 9';
		try {
			$good_r = mysql_query ( $good_sql );
			if (! empty ( $good_r )) {
				$rows = mysql_num_rows ( $good_r );
				$i = 0;
				while ( $ret = mysql_fetch_array ( $good_r ) ) {
					$return [0] [$i] ['goodName'] = $ret ['goodName'];
					$return [0] [$i] ['goodType'] = $ret ['goodType'];
					$return [0] [$i] ['ReleaseTime'] = $ret ['ReleaseTime'];
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
		} catch ( Exception $e ) {
			return $e;
		}
		$sell_sql = 'SELECT goodId,goodName
				FROM Good WHERE goodType="出售" order by ReleaseTime limit 2';
		$buy_sql = 'SELECT goodId,goodName
				FROM Good WHERE goodType="求购" order by ReleaseTime limit 2';
		$rent_sql = 'SELECT goodId,goodName
				FROM Good WHERE goodType="出租" order by ReleaseTime limit 2';
		$srent_sql = 'SELECT goodId,goodName
				FROM Good WHERE goodType="找租" order by ReleaseTime limit 2';
		try {
			$i = 0;
			$sell_r = mysql_query ( $sell_sql );
			if (! empty ( $sell_r )) {
				while ( $ret = mysql_fetch_array ( $sell_r ) ) {
					$return [1] [$i] = $ret;
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [1] [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [1] [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			$buy_r = mysql_query ( $buy_sql );
			if (! empty ( $buy_r )) {
				while ( $ret = mysql_fetch_array ( $buy_r ) ) {
					$return [1] [$i] = $ret;
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [1] [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [1] [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			$rent_r = mysql_query ( $rent_sql );
			if (! empty ( $rent_r )) {
				while ( $ret = mysql_fetch_array ( $rent_r ) ) {
					$return [1] [$i] = $ret;
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [1] [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [1] [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			$srent_r = mysql_query ( $srent_sql );
			if (! empty ( $srent_r )) {
				while ( $ret = mysql_fetch_array ( $srent_r ) ) {
					$return [1] [$i] = $ret;
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [1] [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [1] [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			return array (
					'data' => $return,
					'codes' => 200 
			);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	
	function study_good() {
		$i = 0;
		$book_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,g.ifFinish FROM Good g,goodLabel l
				WHERE g.goodId=l.goodId AND l.content="书籍" order by ReleaseTime DESC limit 3';
		$study_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,g.ifFinish FROM Good g,goodLabel l
				WHERE g.goodId=l.goodId AND l.content="学习用品" order by ReleaseTime DESC limit 3';
		$office_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,g.ifFinish FROM Good g,goodLabel l
				WHERE g.goodId=l.goodId AND l.content="办公用品" order by ReleaseTime DESC limit 3';
		try {
			$book_r = mysql_query ( $book_sql );
			if (! empty ( $book_r )) {
				while ( $ret = mysql_fetch_array ( $book_r ) ) {
					$return [$i] = $ret;
					if ($return [$i] ['ifFinish'] == 0)
						$return [$i] ['ifFinish'] = '未结束';
					else
						$return [$i] ['ifFinish'] = '已结束';
					$return [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			$study_r = mysql_query ( $study_sql );
			if (! empty ( $study_r )) {
				while ( $ret = mysql_fetch_array ( $study_r ) ) {
					$return [$i] = $ret;
					if ($return [$i] ['ifFinish'] == 0)
						$return [$i] ['ifFinish'] = '未结束';
					else
						$return [$i] ['ifFinish'] = '已结束';
					$return [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			$office_r = mysql_query ( $office_sql );
			if (! empty ( $office_r )) {
				while ( $ret = mysql_fetch_array ( $office_r ) ) {
					$return [$i] = $ret;
					if ($return [$i] ['ifFinish'] == 0)
						$return [$i] ['ifFinish'] = '未结束';
					else
						$return [$i] ['ifFinish'] = '已结束';
					$return [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			return array (
					'data' => $return,
					'codes' => 200 
			);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	
	function life_good() {
		$i = 0;
		$life_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,g.ifFinish FROM Good g,goodLabel l
				WHERE g.goodId=l.goodId AND l.content="日常用品" order by ReleaseTime DESC limit 3';
		$em_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,g.ifFinish FROM Good g,goodLabel l
				WHERE g.goodId=l.goodId AND l.content="小家电" order by ReleaseTime DESC limit 3';
		try {
			$life_r = mysql_query ( $life_sql );
			if (! empty ( $life_r )) {
				while ( $ret = mysql_fetch_array ( $life_r ) ) {
					$return [$i] = $ret;
					if ($return [$i] ['ifFinish'] == 0)
						$return [$i] ['ifFinish'] = '未结束';
					else
						$return [$i] ['ifFinish'] = '已结束';
					$return [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			$em_r = mysql_query ( $em_sql );
			if (! empty ( $em_r )) {
				while ( $ret = mysql_fetch_array ( $em_r ) ) {
					$return [$i] = $ret;
					if ($return [$i] ['ifFinish'] == 0)
						$return [$i] ['ifFinish'] = '未结束';
					else
						$return [$i] ['ifFinish'] = '已结束';
					$return [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			return array (
					'data' => $return,
					'codes' => 200 
			);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	
	function digit_good() {
		$i = 0;
		$phone_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,g.ifFinish FROM Good g,goodLabel l
				WHERE g.goodId=l.goodId AND l.content="手机（用品）" order by ReleaseTime DESC limit 3';
		$digit_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,g.ifFinish FROM Good g,goodLabel l
				WHERE g.goodId=l.goodId AND l.content="电子产品" order by ReleaseTime DESC limit 3';
		$computer_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,g.ifFinish FROM Good g,goodLabel l
				WHERE g.goodId=l.goodId AND l.content="电脑（用品）" order by ReleaseTime DESC limit 3';
		try {
			$phone_r = mysql_query ( $phone_sql );
			if (! empty ( $phone_r )) {
				while ( $ret = mysql_fetch_array ( $phone_r ) ) {
					$return [$i] = $ret;
					if ($return [$i] ['ifFinish'] == 0)
						$return [$i] ['ifFinish'] = '未结束';
					else
						$return [$i] ['ifFinish'] = '已结束';
					$return [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			$digit_r = mysql_query ( $digit_sql );
			if (! empty ( $digit_r )) {
				while ( $ret = mysql_fetch_array ( $digit_r ) ) {
					$return [$i] = $ret;
					if ($return [$i] ['ifFinish'] == 0)
						$return [$i] ['ifFinish'] = '未结束';
					else
						$return [$i] ['ifFinish'] = '已结束';
					$return [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			$computer_r = mysql_query ( $computer_sql );
			if (! empty ( $computer_r )) {
				while ( $ret = mysql_fetch_array ( $computer_r ) ) {
					$return [$i] = $ret;
					if ($return [$i] ['ifFinish'] == 0)
						$return [$i] ['ifFinish'] = '未结束';
					else
						$return [$i] ['ifFinish'] = '已结束';
					$return [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$return [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$return [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
			return array (
					'data' => $return,
					'codes' => 200 
			);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	
	function sub($pageid, $type) {
		$i = 0;
		$good_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,
				g.ifFinish FROM Good g,goodLabel l WHERE g.goodId=l.goodId AND l.content
				=\'' . $type . '\' ORDER BY ReleaseTime DESC';
		try {
			$good_r = mysql_query ( $good_sql );
			if (! empty ( $good_r )) {
				while ( $ret = mysql_fetch_array ( $good_r ) ) {
					$result [$i] = $ret;
					if ($result [$i] ['ifFinish'] == 0)
						$result [$i] ['ifFinish'] = '未结束';
					else
						$result [$i] ['ifFinish'] = '已结束';
					$result [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$result [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$result [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
				$beg = ($pageid - 1) * 8;
				$num = $i - $beg;
				if ($num > 8) {
					$ok = 0;
					$num = 8;
				} else
					$ok = 1;
				for($j = 0, $k = $beg; $j < $num; $j ++, $k ++) {
					$return [$j] = $result [$k];
				}
				return array (
						'data' => $return,
						'num' => $num,
						'finish' => $ok,
						codes => 200 
				);
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	
	function subtype($pageid, $type) {
		$i = 0;
		$good_sql = 'SELECT goodId,goodName,goodPrice,goodType,ReleaseTime,ifFinish 
				FROM Good WHERE goodType=\'' . $type . '\'order by ReleaseTime DESC';
		try {
			$good_r = mysql_query ( $good_sql );
			if (! empty ( $good_r )) {
				while ( $ret = mysql_fetch_array ( $good_r ) ) {
					$result [$i] = $ret;
					if ($result [$i] ['ifFinish'] == 0)
						$result [$i] ['ifFinish'] = '未结束';
					else
						$result [$i] ['ifFinish'] = '已结束';
					$result [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$result [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$result [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
				$beg = ($pageid - 1) * 8;
				$num = $i - $beg;
				if ($num > 8) {
					$ok = 0;
					$num = 8;
				} else
					$ok = 1;
				for($j = 0, $k = $beg; $j < $num; $j ++, $k ++) {
					$return [$j] = $result [$k];
				}
				return array (
						'data' => $return,
						'num' => $num,
						'finish' => $ok,
						codes => 200 
				);
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	
	function showother($pageid) {
		$i = 0;
		$good_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,
				g.ifFinish FROM Good g,goodLabel l WHERE g.goodId=l.goodId AND l.content
				="其他" ORDER BY ReleaseTime DESC';
		try {
			$good_r = mysql_query ( $good_sql );
			if (! empty ( $good_r )) {
				while ( $ret = mysql_fetch_array ( $good_r ) ) {
					$result [$i] = $ret;
					if ($result [$i] ['ifFinish'] == 0)
						$result [$i] ['ifFinish'] = '未结束';
					else
						$result [$i] ['ifFinish'] = '已结束';
					$result [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$result [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$result [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
				$beg = ($pageid - 1) * 8;
				$num = $i - $beg;
				if ($num > 8) {
					$ok = 0;
					$num = 8;
				} else
					$ok = 1;
				for($j = 0, $k = $beg; $j < $num; $j ++, $k ++) {
					$return [$j] = $result [$k];
				}
				return array (
						'data' => $return,
						'num' => $num,
						'finish' => $ok,
						codes => 200 
				);
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	
	function showconcern() {
		$i = 0;
		$good_sql = 'SELECT goodId,goodName,goodPrice,goodType,ReleaseTime,ifFinish,goodHit 
				FROM Good order by goodHit DESC limit 5';
		try {
			$good_r = mysql_query ( $good_sql );
			if (! empty ( $good_r )) {
				while ( $ret = mysql_fetch_array ( $good_r ) ) {
					$result [$i] = $ret;
					if ($result [$i] ['ifFinish'] == 0)
						$result [$i] ['ifFinish'] = '未结束';
					else
						$result [$i] ['ifFinish'] = '已结束';
					$result [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$result [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$result [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
				return array (
						'data' => $result,
						codes => 200 
				);
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
		} catch ( Exception $e ) {
			return $e;
		}
	}

	function showmygood($pageid, $userid) {
		$i = 0;
		$good_sql = 'SELECT goodId,goodName,goodType,goodPrice,ReleaseTime,
				ifFinish FROM Good WHERE userId=\''.$userid.'\' ORDER BY ReleaseTime DESC';
		try {
			$good_r = mysql_query ( $good_sql );
			if (! empty ( $good_r )) {
				while ( $ret = mysql_fetch_array ( $good_r ) ) {
					$result [$i] = $ret;
					if ($result [$i] ['ifFinish'] == 0)
						$result [$i] ['ifFinish'] = '未结束';
					else
						$result [$i] ['ifFinish'] = '已结束';
					$result [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$result [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$result [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
				$beg = ($pageid - 1) * 8;
				$num = $i - $beg;
				if ($num > 8) {
					$ok = 0;
					$num = 8;
				} else
					$ok = 1;
				for($j = 0, $k = $beg; $j < $num; $j ++, $k ++) {
					$return [$j] = $result [$k];
				}
				return array (
						'data' => $return,
						'num' => $num,
						'finish' => $ok,
						codes => 200
				);
			} else
				return array (
						'data' => '',
						'codes' => 364
				);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	function showmyconcern($pageid, $userid,$type) {
		$i = 0;
		$good_sql = 'SELECT g.goodId,g.goodName,g.goodType,g.goodPrice,g.ReleaseTime,
				g.ifFinish FROM Good g,goodConcerned c WHERE c.userId = \''.$userid.'\'
				AND g.goodId = c.goodId AND g.goodType = \''.$type.'\' ORDER BY ReleaseTime DESC';
		try {
			$good_r = mysql_query ( $good_sql );
			if (! empty ( $good_r )) {
				while ( $ret = mysql_fetch_array ( $good_r ) ) {
					$result [$i] = $ret;
					if ($result [$i] ['ifFinish'] == 0)
						$result [$i] ['ifFinish'] = '未结束';
					else
						$result [$i] ['ifFinish'] = '已结束';
					$result [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$result [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$result [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
				$beg = ($pageid - 1) * 8;
				$num = $i - $beg;
				if ($num > 8) {
					$ok = 0;
					$num = 8;
				} else
					$ok = 1;
				for($j = 0, $k = $beg; $j < $num; $j ++, $k ++) {
					$return [$j] = $result [$k];
				}
				return array (
						'data' => $return,
						'num' => $num,
						'finish' => $ok,
						codes => 200
				);
			} else
				return array (
						'data' => '',
						'codes' => 364
				);
		} catch ( Exception $e ) {
			return $e;
		}
	}
	
	function search($pageid,$name){
		$i=0;
		$good_sql = 'SELECT goodId,goodName,goodType,goodPrice,ReleaseTime,
				ifFinish FROM Good WHERE goodName LIKE \'%'.$name.'%\'';
	try {
			$good_r = mysql_query ( $good_sql );
			if (! empty ( $good_r )) {
				while ( $ret = mysql_fetch_array ( $good_r ) ) {
					$result [$i] = $ret;
					if ($result [$i] ['ifFinish'] == 0)
						$result [$i] ['ifFinish'] = '未结束';
					else
						$result [$i] ['ifFinish'] = '已结束';
					$result [$i] ['ReleaseTime'] = substr ( $ret ['ReleaseTime'], 0, 10 );
					$img_sql = 'SELECT imgUrl FROM goodImg WHERE goodId=\'' . $ret ['goodId'] . '\'';
					$img_r = mysql_query ( $img_sql );
					$num = mysql_num_rows ( $img_r );
					if ($num == 0) {
						$result [$i] ['goodImg'] = "http://scutfeal-fealimg.stor.sinaapp.com/no-pictrue.png";
					} else {
						$img_row = mysql_fetch_array ( $img_r );
						$goodImg = $img_row ['imgUrl'];
						$result [$i] ['goodImg'] = $goodImg;
					}
					$i ++;
				}
				$beg = ($pageid - 1) * 8;
				$num = $i - $beg;
				if ($num > 8) {
					$ok = 0;
					$num = 8;
				} else
					$ok = 1;
				for($j = 0, $k = $beg; $j < $num; $j ++, $k ++) {
					$return [$j] = $result [$k];
				}
				return array (
						'data' => $return,
						'num' => $num,
						'finish' => $ok,
						codes => 200 
				);
			} else
				return array (
						'data' => '',
						'codes' => 364 
				);
		} catch ( Exception $e ) {
			return $e;
		}
	}
    function endtrans($goodid)
    {
    	$good_sql = 'UPDATE Good SET ifFinish = 1 WHERE goodId=\''.$goodid.'\'';
    	$return=mysql_query($good_sql);
    	
    	if($return)
    	{
    		return array('data'=>'','codes'=>200);
    	}
    	else return array('data'=>'','codes'=>364);
    }

    function wcomment($goodid,$content,$userid)
    {
    	try {
    		$user_sql='SELECT userId FROM Good WHERE goodId = \''.$goodid.'\'';
    		$user_r=mysql_query($user_sql);
    		if(!empty($user_r))
    		{
    			$owner_r=mysql_fetch_array($user_r);
    			$ownerid=$owner_r['userId'];
    		}
    		else return array (
    					'data' => '',
    					'codes' => 101
    			);
    		$com_sql = 'INSERT INTO goodComment (goodOwnerId,commentOwnerId,goodId,content) VALUES (\'' . $ownerid . '\',\'' . $userid . '\',\'' . $goodid . '\',\'' . $content . '\')';		
    		$r = mysql_query ( $com_sql );
    		if (!$r)
    			return array (
    					'data' => '',
    					'codes' => 102
    			);
    		$ret_sql='SELECT u.userName,c.content,c.giveTime FROM User u,goodComment c WHERE c.goodId= \''
						.$goodid.'\' AND u.userId = c.commentOwnerId ORDER BY c.giveTime DESC';
    		$com_r=mysql_query($ret_sql);
    		if(!empty($com_r))
    		{
    			$j = 0;
    			while ( $com_row = mysql_fetch_array ( $com_r ) ) {
    				$return ['comment'] [$j] = $com_row;
    				$j ++;
    			}
    			$return['comnum']=$j;
    		}
    		else
    		{
    			$return['comnum']=0;
    			$return['comment']='none';
    		}
    				return array (
    						'data' => $return,
    						'codes' => 200
    				);
    	} catch ( Exception $e ) {
    		return $e;
    	}
    }

    function collect($goodid,$userid,$concern)
    {
    	if($concern==0)
    	{
    		$in_sql='INSERT INTO goodConcerned (goodId ,userId) VALUES (\'' . $goodid . '\',\'' . $userid . '\')';
    		$sql_r=mysql_query($in_sql);
    		if(!$sql_r)
    		{
    			return array('data'=>'','codes'=>101);
    		}
    		return array('data'=>'','codes'=>200);
    	}
    	else 
    	{
    		$de_sql='DELETE FROM goodConcerned WHERE goodId = \''.$goodid.'\'';
    		$sql_r=mysql_query($de_sql);
    		if(!$sql_r)
    		{
    			return array('data'=>'','codes'=>101);
    		}
    		return array('data'=>'','codes'=>200);
    	}
    }
}
	

