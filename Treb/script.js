const db = {
    cidade: [
        {
            nome: "São Paulo",
            quantidade: 15,
            classe: ["econômica", "executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Rio de Janeiro",
            quantidade: 12,
            classe: ["econômica", "executiva"],
            passagem: ["ida"]
        },
        {
            nome: "Belo Horizonte",
            quantidade: 5,
            classe: ["executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Salvador",
            quantidade: 9,
            classe: ["econômica", "executiva"],
            passagem: ["ida"]
        },
        {
            nome: "Brasília",
            quantidade: 19,
            classe: ["primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Curitiba",
            quantidade: 30,
            classe: ["econômica", "executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "João Pessoa",
            quantidade: 20,
            classe: ["econômica", "executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Maceió",
            quantidade: 27,
            classe: ["econômica", "executiva"],
            passagem: ["ida"]
        },
        {
            nome: "Porto Seguro",
            quantidade: 11,
            classe: ["econômica", "executiva", "primeira"],
            passagem: ["ida", "volta"]
        }
    ]
};

function validateForm(event) {
    let valid = true;

    const origem = document.getElementById('origem').value.trim();
    const destino = document.getElementById('destino').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value.trim());
    const classe = document.getElementById('classe').value.trim();
    const idaVolta = document.getElementById('idaVolta').checked;
    document.getElementById('erroOrigem').style.display = 'none';
    document.getElementById('erroDestino').style.display = 'none';
    document.getElementById('erroQuantidade').style.display = 'none';
    document.getElementById('erroClasse').style.display = 'none';
    document.getElementById('outrosDestinos').classList.remove('highlighted-link');

    if (!origem) {
        document.getElementById('erroOrigem').style.display = 'block';
        document.getElementById('erroOrigem').innerHTML = 'Por favor, insira o local de origem.';
        valid = false;
    }
    if (!destino) {
        document.getElementById('erroDestino').style.display = 'block';
        document.getElementById('erroDestino').innerHTML = 'Por favor, insira o local de destino.';
        valid = false;
    }
    if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
        document.getElementById('erroQuantidade').style.display = 'block';
        document.getElementById('erroQuantidade').innerHTML = 'Por favor, insira a quantidade de passagens.';
        valid = false;
    }
    if (!classe) {
        document.getElementById('erroClasse').style.display = 'block';
        document.getElementById('erroClasse').innerHTML = 'Por favor, selecione a classe.';
        valid = false;
    }

    if (idaVolta) {
        const roundtripAvailability = checkRoundtripAvailability(destino);
        if (!roundtripAvailability) {
            document.getElementById('erroDestino').style.display = 'block';
            document.getElementById('erroDestino').innerHTML = 'Lamentamos, possuímos apenas passagens de ida para a cidade selecionada.';
            valid = false;
        }
    }

    if (!checkCityExistence(origem)) {
        document.getElementById('erroOrigem').style.display = 'block';
        document.getElementById('erroOrigem').innerHTML = 'A cidade de origem não foi encontrada.';
        valid = false;
    }
    if (!checkCityExistence(destino)) {
        document.getElementById('erroDestino').style.display = 'block';
        document.getElementById('erroDestino').innerHTML = 'A cidade de destino não foi encontrada.';
        valid = false;
    }

    if (valid) {
        alert('Dados buscados com sucesso!');
    }

    if (!valid) {
        event.preventDefault();
    }

    return valid;
}

function checkRoundtripAvailability(destino) {
    const cityData = db.cidade.find(city => city.nome.toLowerCase() === destino.toLowerCase());
    return cityData ? cityData.passagem.includes('ida') && cityData.passagem.includes('volta') : false;
}

function checkCityExistence(cityName) {
    return db.cidade.some(city => city.nome.toLowerCase() === cityName.toLowerCase());
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formPassagens').addEventListener('submit', validateForm);
});
