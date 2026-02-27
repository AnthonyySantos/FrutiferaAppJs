
// Pega o elemento html com o id "forFruta"
let formFruta = document.getElementById('formFruta');

// Recupera do LocalStorage ou cria array vazio
let frutas = JSON.parse(localStorage.getItem('frutas')) || [];

// Impede o browser de pegar o formulario
formFruta.onsubmit = (event) => {
    event.preventDefault();

    // Pegando os valores DENTRO do submit
    let nome = document.getElementById('nomePopular').value;
    let nomeC = document.getElementById('nomeCientifico').value;
    let producao = document.getElementById('producao').value;
    let data = document.getElementById('dataPlantio').value;

    // Criando o objeto
    let formFrutaJson = {
        id: Date.now(),
        nome: nome,
        nomeCientifico: nomeC,
        producao: producao,
        dataPlantio: data
    };

    // Adicionando no array
    frutas.push(formFrutaJson);


    // Salvando no LocalStorage
    localStorage.setItem('frutas', JSON.stringify(frutas));

    // Fechar o modal ao adicionar
    listarFrutas();

    let modalElement = document.getElementById('modalCadastro');
    let modal = bootstrap.Modal.getInstance(modalElement) 
            || new bootstrap.Modal(modalElement);
    modal.hide();

    formFruta.reset();

    console.log("Salvo com sucesso!");
};

// Criar Cards, pegando os valores do localStorage e armazenando numa variavel transformado em objeto. Outraa variavel puxando o elemento HTML onde ira ficar os CARDS. E por fim a estrutura de repetição utilizada (FOR)

function listarFrutas() {
    let frutas = JSON.parse(localStorage.getItem('frutas')) || [];
    let lista = document.getElementById("listaFrutas");
    lista.innerHTML = "";

    for (let i = 0; i < frutas.length; i++) {
        let fruta = frutas[i];

        lista.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card shadow">
                <div class="card-body">
                    <h5 class="card-title">${fruta.nome}</h5>
                    <p><strong>ID:</strong> ${fruta.id}</p>
                    <p><strong>Nome Científico:</strong> ${fruta.nomeCientifico}</p>
                    <p><strong>Produção Média:</strong> ${fruta.producao} Kg</p>
                    <p><strong>Plantio:</strong> ${fruta.dataPlantio}</p>
                    <p><strong>Idade:</strong> ${calcularIdadeMeses(fruta.dataPlantio)} meses</p>
                </div>
            </div>
        </div>
        `;
    };
}

// Função de calculo. Ele armazena a diferença do ano atual com o do plantio, do mes atual com o do plantio, depois transforma os anos em meses e soma com os meses armazenado. Se a data colocada não tiver completado um mes completo ele vai subtrair um mes do total.
function calcularIdadeMeses(dataPlantio) {
    let hoje = new Date();
    let plantio = new Date(dataPlantio);

    let anos = hoje.getFullYear() - plantio.getFullYear();
    let meses = hoje.getMonth() - plantio.getMonth();
    let totalMeses = anos * 12 + meses;

    if (hoje.getDate() < plantio.getDate()) {
        totalMeses--;
    }

    return totalMeses;
}


window.onload = listarFrutas;
