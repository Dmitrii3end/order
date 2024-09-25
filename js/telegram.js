const TOKEN = '7332625961:AAGrtzKGYmAh6dEnTDzT2BJ79w5OTASjj-8';
const CHATID = '-4556987065';
const MYCHATID = '853051670';

document.querySelector('#order').addEventListener('click', (e) => {
    e.preventDefault();

    sendData();
});

function sendData(){
    const tg = window.Telegram.WebApp;

    let userName = tg.initDataUnsafe?.user?.first_name;

    let message = '';

    let name = document.querySelector('#name').value;
    let adres = document.querySelector('#adres').value;
    let date = document.querySelector('#date').value;

    message += `<b>Отправитель: </b> ${userName}. %0A`
    message += `<b>Имя пользователя: </b> ${name}. %0A`
    message += `<b>Адрес: </b> ${adres}. %0A`
    message += `<b>Дата: </b> ${date}. %0A`

    let products = document.querySelectorAll('.product__name');
    let product__value = document.querySelectorAll('.product__value');
    let product__all__value = document.querySelectorAll('.product__all__value');

    console.log(message)
    for (let i = 0; i < products.length; i++){
        message += `<b>Название: </b> ${products[i].value}.%0A`;
        message += `<b>Кол-во: </b> ${product__value[i].value}.%0A`;
        message += `<b>Единица измерения: </b> ${product__all__value[i].value}.%0A`;
    }
    
    let url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHATID}&parse_mode=html&text=${message}`;

    fetch(url);
    console.log(message);
}