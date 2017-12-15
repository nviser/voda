<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")) {
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
                    </body>
                </html>'; 
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
        $headers .= "From: Water Kahariz <noreply@kahariz.su>\r\n"; 
        mail($to, $subject, $message, $headers); 
}
?>