const api_endpoint = 'https://viacep.com.br/ws/CEP/json/';
let cepObject = {}; 

function clickSearchCep () {
    const isValid = validateFieldIsBlank();
    if (isValid) {
        searchInApi();      
    }
}


function validateFieldIsBlank () {
    const cep = document.getElementById('cep');

    if (cep.value == null || cep.value == "") {
        cep.classList.add('invalid');
        return false;
    }
    else if (cep.classList.contains('invalid')) {
        cep.classList.remove('invalid');
    }

    return true;
}

async function searchInApi () {
    let urlApi = api_endpoint.replace('CEP',  document.getElementById('cep').value);
    const responseApi = await fetch(urlApi);
    validateReturnApi(responseApi);
}

function validateReturnApi (responseApi) {
    if (responseApi.status == 200) {
        handleResponseApi(responseApi);
    }
}

async function handleResponseApi (responseApi) {
    const cepObject = await responseApi.json();
    let resultDiv = document.getElementById('result');

    if (cepObject.erro == "true") {
        resultDiv.style.display = 'none';
        document.getElementById('invalid-cep').style.display = 'flex';
        return;
    }

    document.getElementById('streetResult').innerHTML = cepObject.logradouro;
    document.getElementById('districtResult').innerHTML = cepObject.bairro;
    document.getElementById('cityResult').innerHTML = cepObject.localidade;
    document.getElementById('ufResult').innerHTML = cepObject.uf;


    resultDiv.style.display = 'flex';
    document.getElementById('invalid-cep').style.display = 'none';

}