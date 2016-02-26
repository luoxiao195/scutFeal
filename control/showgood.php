<?php
include '../util/token.php';
include '../util/function.php';
include '../model/goodModel.php';

$goodModel = new goodModel ();

if (isset ( $_POST ['request'] )) {
	switch ($_POST ['request']) {
		case 'showfirst' :
			$return = $goodModel->topgood ();
			echo json_encode ( $return );
			break;
		case 'studygood' :
			$return = $goodModel->study_good ();
			echo json_encode ( $return );
			break;
		case 'lifegood' :
			$return = $goodModel->life_good ();
			echo json_encode ( $return );
			break;
		case 'digitgood' :
			$return = $goodModel->digit_good ();
			echo json_encode ( $return );
			break;
		case 'subbook' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '书籍';
				$return = $goodModel->sub ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'substudy' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '学习用品';
				$return = $goodModel->sub ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'suboffice' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '办公用品';
				$return = $goodModel->sub ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'sublife' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '日常用品';
				$return = $goodModel->sub ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'subem' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '小家电';
				$return = $goodModel->sub ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'subdigit' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '电子产品';
				$return = $goodModel->sub ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'subphone' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '手机（用品）';
				$return = $goodModel->sub ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'subcomputer' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '电脑（用品）';
				$return = $goodModel->sub ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'showsell' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '出售';
				$return = $goodModel->subtype ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'showrent' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '出租';
				$return = $goodModel->subtype ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'showbuy' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '求购';
				$return = $goodModel->subtype ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'showsrent' :
			if (isset ( $_POST ['pageId'] )) {
				$type = '找租';
				$return = $goodModel->subtype ( $_POST ['pageId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'subother' :
			if (isset ( $_POST ['pageId'] )) {
				$return = $goodModel->showother ( $_POST ['pageId'] );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'subconcern' :
			$return = $goodModel->showconcern ();
			echo json_encode ( $return );
			break;
		case 'search' :
			if (isset ( $_POST ['name'] ) && isset ( $_POST ['pageId'] )) {
				$return = $goodModel->search ( $_POST ['pageId'], $_POST ['name'] );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'showmygood' :
			if (isset ( $_POST ['pageId'] ) && isset ( $_POST ['token'] ) && isset ( $_SESSION ['userId'] ) && validToken ( $_SESSION ['userId'], $_POST ['token'] )) {
				$return = $goodModel->showmygood ( $_POST ['pageId'], $_SESSION ['userId'] );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'showmyconcern1' :
			if (isset ( $_POST ['pageId'] ) && isset ( $_POST ['token'] ) && isset ( $_SESSION ['userId'] ) && validToken ( $_SESSION ['userId'], $_POST ['token'] )) {
				$type = '出售';
				$return = $goodModel->showmyconcern ( $_POST ['pageId'], $_SESSION ['userId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'showmyconcern2' :
			if (isset ( $_POST ['pageId'] ) && isset ( $_POST ['token'] ) && isset ( $_SESSION ['userId'] ) && validToken ( $_SESSION ['userId'], $_POST ['token'] )) {
				$type = '求购';
				$return = $goodModel->showmyconcern ( $_POST ['pageId'], $_SESSION ['userId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'showmyconcern3' :
			if (isset ( $_POST ['pageId'] ) && isset ( $_POST ['token'] ) && isset ( $_SESSION ['userId'] ) && validToken ( $_SESSION ['userId'], $_POST ['token'] )) {
				$type = '出租';
				$return = $goodModel->showmyconcern ( $_POST ['pageId'], $_SESSION ['userId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'showmyconcern4' :
			if (isset ( $_POST ['pageId'] ) && isset ( $_POST ['token'] ) && isset ( $_SESSION ['userId'] ) && validToken ( $_SESSION ['userId'], $_POST ['token'] )) {
				$type = '找租';
				$return = $goodModel->showmyconcern ( $_POST ['pageId'], $_SESSION ['userId'], $type );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'endtrans' :
			if (isset ( $_POST ['goodId'] ) && isset ( $_POST ['token'] ) && isset ( $_SESSION ['userId'] ) 
			&& validToken ( $_SESSION ['userId'], $_POST ['token'] )&&$_POST['content']) {
				$return = $goodModel->endtrans ( $_POST ['goodId'] );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		case 'comment':
			if(isset ( $_POST ['goodId'] ) && isset ( $_POST ['token'] ) && isset ( $_SESSION ['userId'] ) && validToken ( $_SESSION ['userId'], $_POST ['token'] ))
			{
				$return = $goodModel->wcomment( $_POST ['goodId'],$_POST['content'],$_SESSION['userId'] );
				echo json_encode ( $return );
				} else
					echo json_encode ( array (
							'data' => '',
							'codes' => 104
					) );
					break;
		case 'collect':
			if(isset ( $_POST['concern'])&&isset($_POST ['goodId'] ) && isset ( $_POST ['token'] ) && isset ( $_SESSION ['userId'] ) && validToken ( $_SESSION ['userId'], $_POST ['token'] ))
			{
				$return = $goodModel->collect($_POST['goodId'], $_SESSION['userId'], $_POST['concern']);
				echo json_encode ( $return );
				} else
					echo json_encode ( array (
							'data' => '',
							'codes' => 104
					) );
					break;
			
	}
}
	else {
	echo json_encode ( array (
			'data' => '',
			'codes' => 355 
	) );
}