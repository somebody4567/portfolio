<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('smaxims03@mail.ru', 'Проект-портфолио');
	//Кому отправить
	$mail->addAddress('yowekoc653@specialistblog.com');
	$mail->addAddress('smaxims03@mail.ru');
	//Тема письма
	$mail->Subject = 'Привет! Пришло письмо.';

	//Тело письма
	$body = '<h1>Встречайте супер письмо!</h1>';
	
	if (trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if (trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if (trim(!empty($_POST['textarea']))){
		$body.='<p><strong>Сообщение:</strong> '.$_POST['textarea'].'</p>';
	}

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>