const api_endpoint = 'https://viacep.com.br/ws/CEP/json/';
const status_ok = 200;

function clickSearchCep () {
    const isValid = validateFieldIsBlank();
    if (isValid) {
        searchInApi();      
    }
}

function validateFieldIsBlank () {
    const cep = document.getElementById('cep');

    if (isNullOrEmpty(cep.value)) {
        cep.classList.add('invalid');
        return false;
    }
    
    if (cep.classList.contains('invalid')) {
        cep.classList.remove('invalid');
    }

    return true;
}

function isNullOrEmpty (value) {
    return value == null || value == "";
}

async function searchInApi () {
    let urlApi = api_endpoint.replace('CEP',  document.getElementById('cep').value);
    const responseApi = await fetch(urlApi);
    validateReturnApi(responseApi);
}

async function validateReturnApi (responseApi) {
    if (responseApi.status == status_ok) {
        handleResponseApi(await responseApi.json());
    }
}

function handleResponseApi (cepObject) {
    let resultDiv = document.getElementById('result');

    if (cepObject.erro == "true") {
        resultDiv.style.display = 'none';
        document.getElementById('invalid-cep').style.display = 'flex';
        return;
    }

    fillInFieldsAfterCalledApi(cepObject);
    resultDiv.style.display = 'flex';
    document.getElementById('invalid-cep').style.display = 'none';
}

function fillInFieldsAfterCalledApi (cepObject) {
    document.getElementById('streetResult').innerHTML = cepObject.logradouro;
    document.getElementById('districtResult').innerHTML = cepObject.bairro;
    document.getElementById('cityResult').innerHTML = cepObject.localidade;
    document.getElementById('ufResult').innerHTML = cepObject.uf;
}
