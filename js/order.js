const KEY = 'AIzaSyARx8Y4TfJr-X0ExQhdlMmpWjqmaaE3DL8';
const CLIENTID = '875309741954-hl010fec3uj5kptk9ude1gs5ici6b1ej.apps.googleusercontent.com';
const URL = 'https://script.google.com/macros/s/AKfycbwYTib7B_-wRonL9e-NbSQT6yI-8IbqrDCF6uZzqO2fCTSWDMz3EKaqCz2zrFR1oqkP9g/exec';


async function init(){
    let response = await fetch(URL)

    if (response.ok){
        let json = await response.json();
        console.log(json)
        getOptions(json);
        onChange(document.querySelector('.product__name'), document.querySelector('.product__info span'), json);
    }

    return false;
}

function getOptions(array){
    const datalist = document.querySelector('#product');
    
    datalist.innerHTML = '';

    for (let i = 0; i < array.length; i++){
        let option = document.createElement('option')
        option.innerText = array[i][0];
        datalist.append(option);
    }
}

function onChange(input, span, array){
    // const input = document.querySelector('.product__name');

    input.addEventListener('change', (e) => {
        for (let i = 0; i < array.length; i++){
            if (e.target.value == array[i][0]){
                span.innerHTML = `Кол-во в упаковке: ${array[i][5]} шт.`;
                break;
            }
        }
    })
}

document.querySelector('#addProduct').addEventListener('click', (e) => {
    e.preventDefault();

    const product = document.createElement('div');
    product.classList.add('product');
    
    const productName = document.createElement('input');
    productName.classList.add('product__name');
    productName.setAttribute('name', 'Продукт');
    productName.placeholder = 'название';
    productName.list = 'product';
    
    const productInfo = document.createElement('div');
    productInfo.classList.add('product__info');

    const span = document.createElement('span');
    span.innerText = 'кол-во в упаковке: '

    const productValue = document.createElement('input');
    productValue.classList.add('product__value');
    productValue.setAttribute('name', 'кол-во упаковок');
    productValue.type = 'number';
    productValue.placeholder = 'кол-во упаковок';
    
    const productAllValue = document.createElement('input');
    productAllValue.classList.add('product__value');
    productAllValue.setAttribute('name', 'общее кол-во');
    productAllValue.placeholder = 'всего';

    product.append(productName, productInfo);
    productInfo.append(span, productValue, productAllValue);

    document.querySelector('.products').append(product);
})

init()

