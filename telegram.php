<?php

$token = "7332625961:AAGrtzKGYmAh6dEnTDzT2BJ79w5OTASjj-8";
$chat_id = "853051670";

foreach($_POST as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
  };

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>