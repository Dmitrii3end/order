
const URL = 'https://script.google.com/macros/s/AKfycbwYTib7B_-wRonL9e-NbSQT6yI-8IbqrDCF6uZzqO2fCTSWDMz3EKaqCz2zrFR1oqkP9g/exec';
let currentInput;
let currentSpan;

const tg = window.Telegram.WebApp;

document.querySelector('#username').innerText = tg.initDataUnsafe?.user?.username;

const VALUETYPE = ['Упаковка', 'Штучно'];

let productArray = [];

const datalist = document.querySelector('.list');

async function init(){
    let response = await fetch(URL)

    if (response.ok){
        let json = await response.json();
        productArray = json;
        console.log(json)
        onChange(document.querySelector('.product__name'), document.querySelector('.product__info span'), productArray);
        // onChangeValue(document.querySelector('.product__info span'), document.querySelector('.value'), document.querySelector('.allValue'));
        // onChangeAllValue(document.querySelector('.product__info span'), document.querySelector('.value'), document.querySelector('.allValue'));
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.isLoading').classList.remove('isLoading');
        document.querySelector('.product__name').addEventListener('focus', (e) =>{
            currentInput = e.target;
            currentSpan = document.querySelector('#currentSpan0');
        });

        productArray.forEach((e) => {
            const option = document.createElement('span');
            option.innerText = e[0];
            datalist.append(option);
            option.addEventListener('click', (event) =>{
                currentInput.value = event.target.textContent;
                datalist.style.display = 'none';
                

                for (let i = 0; i < productArray.length; i++){
                    if (event.target.textContent == productArray[i][0]){
                        currentSpan.innerHTML = `Кол-во в упаковке: ${productArray[i][5]} шт.`;
                        
                        currentSpan.setAttribute('data-count', productArray[i][5]);
                        break;
                    }
                }
            });
        });

        getInputSearch(document.querySelector('.product__name'), document.querySelector('#currentSpan0'));
    }

    return false;
}

function onChange(input, span, array){
    input.addEventListener('change', (e) => {
            for (let i = 0; i < array.length; i++){
                if (currentInput.value == array[i][0]){
                    span.innerHTML = `Кол-во в упаковке: ${array[i][5]} шт.`;
                    
                    span.setAttribute('data-count', array[i][5]);
                    break;
                }
            }
    });
}

function onChangeValue(inOne, target, secondTarget){
    target.addEventListener('keyup', (e) => {
        secondTarget.value = countAll(inOne.dataset.count, target.value);
    });
}

function onChangeAllValue(inOne, target, allValueTarget){
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
    productName.setAttribute('autocomplete', 'off');
    productName.placeholder = 'название';
    productName.addEventListener('focus', (e) =>{
        currentInput = e.target;
    });
    productName.required = true;
    
    const productInfo = document.createElement('div');
    productInfo.classList.add('product__info');
    
    const span = document.createElement('span');
    span.innerText = 'Кол-во в упаковке: '
    getInputSearch(productName, span);

    const productValue = document.createElement('input');
    productValue.classList.add('product__value');
    productValue.setAttribute('name', 'product__value[]');
    productValue.type = 'number';
    productValue.placeholder = 'кол-во упаковок';
    productValue.required = true;
    
    // const productAllValue = document.createElement('input');
    // productAllValue.classList.add('product__value');
    // productAllValue.setAttribute('name', 'product__all__value[]');
    // productAllValue.placeholder = 'всего';
    // productAllValue.required = true;
    const productAllValue = document.createElement('select');
    productAllValue.setAttribute('name', 'product__all__value[]');

    for (let i = 0; i < VALUETYPE.length; i++){
        const productAllValueOption = document.createElement('option');
        productAllValueOption.innerText = VALUETYPE[i];

        productAllValue.append(productAllValueOption);
    }

    product.append(productName, productInfo);
    productInfo.append(span, productValue, productAllValue);

    document.querySelector('.products').append(product);

    onChange(productName, span, productArray);
    // onChangeValue(span, productValue, productAllValue);
    // onChangeAllValue(span, productValue, productAllValue);
})

function getInputSearch(input, span){
    const datalist = document.querySelector('.list');

    input.addEventListener('keyup', (event) =>{
        const arr = datalist.querySelectorAll('span');
        arr.forEach((e) =>{
            let text = e.textContent.toLowerCase();
            let searchText = event.target.value.toLowerCase();
            text.indexOf(searchText) != -1? e.style.display = 'inline' : e.style.display = 'none';
        })
    })

    input.addEventListener('click', (event) =>{
        event.stopPropagation();

        currentSpan = span;

        const arr = datalist.querySelectorAll('span');
        
        arr.forEach((e) =>{
            let text = e.textContent.toLowerCase();
            let searchText = event.target.value.toLowerCase();
            text.indexOf(searchText) != -1? e.style.display = 'inline' : e.style.display = 'none';
        })

        datalist.style.display = 'flex';
        datalist.style.width = event.target.offsetWidth + 'px';
        datalist.style.top = event.target.offsetHeight + event.target.offsetTop + 'px';
    })

    document.addEventListener('click', (e) => {
        datalist.style.display = 'none';
    })
}

init();

