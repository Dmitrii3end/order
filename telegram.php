<?php

$token = "7019805673:AAFmCq-WEPUe0rbf4AHO4B8yMgtIHsNdwdQ";
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