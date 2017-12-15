<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")&&(isset($_POST['email'])&&$_POST['email'])&&(isset($_POST['date'])&&$_POST['date'])&&(isset($_POST['address'])&&$_POST['address']!="")&&(isset($_POST['quantity'])&&$_POST['quantity']!="")) {
        $to = 'tikkiwiki@gmail.com,lex24@ukr.net '; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Kahariz | Water';
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
			<p>К Вам поступила заявка. Данные клиента:</p>
						<p>Имя: '.$_POST['name'].'</p>
						<p>Телефон: '.$_POST['phone'].'</p>
						<p>email: '.$_POST['email'].'</p>
                        <p>Дата: '.$_POST['date'].'</p>
                        <p>Адрес: '.$_POST['address'].'</p>
						<p>Количество: '.$_POST['quantity'].'</p>
                    </body>
                </html>'; 
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
        $headers .= "From: Water Kahariz <noreply@kahariz.su>\r\n"; 
        mail($to, $subject, $message, $headers); 
}
?>