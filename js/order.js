const KEY = 'AIzaSyARx8Y4TfJr-X0ExQhdlMmpWjqmaaE3DL8';
const CLIENTID = '875309741954-hl010fec3uj5kptk9ude1gs5ici6b1ej.apps.googleusercontent.com';
const URL = 'https://script.google.com/macros/s/AKfycbwYTib7B_-wRonL9e-NbSQT6yI-8IbqrDCF6uZzqO2fCTSWDMz3EKaqCz2zrFR1oqkP9g/exec';

let productArray = [];


async function init(){
    let response = await fetch(URL)

    if (response.ok){
        let json = await response.json();
        productArray = json;
        console.log(json)
        getOptions(json);
        onChange(document.querySelector('.product__name'), document.querySelector('.product__info span'), productArray);
        onChangeValue(document.querySelector('.product__info span'), document.querySelector('.value'), document.querySelector('.allValue'));
        onChangeAllValue(document.querySelector('.product__info span'), document.querySelector('.value'), document.querySelector('.allValue'));
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.isLoading').classList.remove('isLoading');
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
    input.addEventListener('change', (e) => {
        for (let i = 0; i < array.length; i++){
            if (e.target.value == array[i][0]){
                span.innerHTML = `Кол-во в упаковке: ${array[i][5]} шт.`;
                
                span.setAttribute('data-count', array[i][5]);
                break;
            }
        }
    });
}

function onChangeValue(inOne, target, secondTarget){
    console.log(target)
    target.addEventListener('keyup', (e) => {
        secondTarget.value = countAll(inOne.dataset.count, target.value);
    });
}

function onChangeAllValue(inOne, target, allValueTarget){
    console.log(target)
    allValueTarget.addEventListener('keyup', (e) => {
        target.value = countValue(inOne.dataset.count, allValueTarget.value);
    });
}

function countValue(inOne, countAll){
    inOne = +inOne;
    if (countAll == '') return 0;
    return countAll / inOne;
}

function countAll(inOne, count){
    inOne = +inOne;
    if (count == '') return 0;
    return inOne * count;
}

document.querySelector('#addProduct').addEventListener('click', (e) => {
    e.preventDefault();

    const product = document.createElement('div');
    product.classList.add('product');
    
    const productName = document.createElement('input');
    productName.classList.add('product__name');
    productName.setAttribute('name', 'product__name[]');
    productName.setAttribute('list', 'product');
    productName.placeholder = 'название';
    productName.list = 'product';
    
    const productInfo = document.createElement('div');
    productInfo.classList.add('product__info');

    const span = document.createElement('span');
    span.innerText = 'Кол-во в упаковке: '

    const productValue = document.createElement('input');
    productValue.classList.add('product__value');
    productValue.setAttribute('name', 'product__value[]');
    productValue.type = 'number';
    productValue.placeholder = 'кол-во упаковок';
    
    const productAllValue = document.createElement('input');
    productAllValue.classList.add('product__value');
    productAllValue.setAttribute('name', 'product__all__value[]');
    productAllValue.placeholder = 'всего';

    product.append(productName, productInfo);
    productInfo.append(span, productValue, productAllValue);

    document.querySelector('.products').append(product);

    onChange(productName, span, productArray);
    onChangeValue(span, productValue, productAllValue);
    onChangeAllValue(span, productValue, productAllValue);
})

init()

