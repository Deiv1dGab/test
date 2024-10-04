<?php

$destino = "marcosvssantos@gmail.com";

$assunto = $_POST['assunto'];
$mensagem = $_POST['mensagem'];
$nome = $_POST['nome'];
$remetente = $_pPOST['email'];

$mensagemFormatada = nl2br(htmlspecialchars($mensagem));

$sucesso - mail($destino, $assunto, $mensagemFormatada);

if ($sucesso){
    echo 'E-mail enviado com sucesso';
}else{
    echo'Erro ao enviar';
}
?>