<?php
include '../util/token.php';
include '../util/function.php';
include '../model/goodModel.php';

$goodModel = new goodModel ();

if (isset ( $_POST ['request'] )) {
	switch ($_POST ['request']) {
		case 'addGood' :
			if (isset ( $_POST ['token'] ) && is_numeric ( $_POST ['goodPrice'] ) 
			&& isset ( $_SESSION ['userId'] ) && validToken ( $_SESSION ['userId'], 
			$_POST ['token'] )) {
				$return = $goodModel->addGood ( $_POST ['goodName'], $_POST ['goodPrice'],
						 $_POST ['goodType'], $_POST ['goodDesc'], $_POST ['label'], 
						$_POST ['imgUrl'], $_SESSION ['userId'] );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 361 
				) );
			break;
		case 'goodInfo' :
			if (isset ( $_POST ['goodId'])&&isset($_POST['token'])) {
				if($_POST['token']==1)
				$return = $goodModel->goodInfo ( $_POST ['goodId'], 0, NULL );
				else if(isset($_SESSION['userId']))
				$return = $goodModel->goodInfo ( $_POST ['goodId'], 1, $_SESSION['userId'] );
				else 
					echo json_encode ( array (
							'data' => '',
							'codes' => 105
					) );
				echo json_encode ( $return );
			} else
				echo json_encode ( array (
						'data' => '',
						'codes' => 104 
				) );
			break;
		default :
			// code...
			echo 'nothing happen';
			break;
	}
} else {
	echo json_encode ( array (
			'data' => '',
			'codes' => 355 
	) );
}
