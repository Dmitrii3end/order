<?php

$token = "7332625961:AAGrtzKGYmAh6dEnTDzT2BJ79w5OTASjj-8";
$chat_id = "-4556987065";

$username = $_POST['username'];
$name = $_POST['name'];
$adres = $_POST['adres'];
$date = $_POST['date'];
$products = $_POST['product__name'];
$product__value = $_POST['product__value'];
$product__all__value = $_POST['product__all__value'];
$counter = 0;

$arr = array(
    'Заказ создал: '     => $username,
    'Имя пользователя: ' => $name,
    'Адрес: '            => $adres,
    'Дата: '             => $date
  );

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
  };

  // foreach($products as $key => $value) {
  //   $txt .= "<b> products </b> ".$value."%0A";
  // };

 for ($i = 0; $i < count($products); $i++) {
    $txt .= "%0A";
    $txt .= "<b>Название: </b> ".$products[$i]."%0A";
    $txt .= "<b>Кол-во: </b> ".$product__value[$i]."%0A";
    $txt .= "<b>Единица измерения: </b> ".$product__all__value[$i]."%0A";
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: order.html');
} else {
  echo "Error";
}
?>