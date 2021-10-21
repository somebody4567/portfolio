<?php 

$name = $_POST['name'];
$textareaMessage = $_POST['textarea'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'makssokol.1909@gmail.com';                 // Наш логин
$mail->Password = 'maks200319Q';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('makssokol.1909@gmail.com', 'Portfolio');   // От кого письмо 
$mail->addAddress('yowekoc653@specialistblog.com');     // Add a recipient
$mail->addAddress('makssokol.1909@gmail.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пришло письмо <br> 
	Имя: ' . $name . ' <br>
	Сообщение: ' . $textareaMessage . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>