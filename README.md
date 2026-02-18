# FrutiferaAppJs

Página HTML com CSS:

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FrutiferaApp</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        .plus-btn {
        position: fixed;
        right: 20px ;   
        bottom: 20px; 
        width: 60px;
        height: 60px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        }

</style>

</head>
<body>
    <div id="home" class="container-fluid p-0">
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="fruta1.jpg" class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="fruta2.jpg" class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="fruta3.jpg" class="d-block w-100">
            </div>
        </div>
    </div>
    </div>

    <div class="container mt-5">
    <h2 class="text-center mb-4">Cadastre Sua Fruta Aqui</h2>
    <div class="row" id="listaFrutas"></div>
    </div>

    <button class="btn btn-success rounded-circle plus-btn" data-bs-toggle="modal" data-bs-target="#modalCadastro">+</button>

    <div class="modal fade" id="modalCadastro">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cadastro De Frutas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <form id="formFruta">
                    <div class="mb-3">
                        <label>Nome Popular</label>
                        <input type="text" class="form-control" id="nomePopular" required>
                    </div>

                    <div class="mb-3">
                        <label>Nome Científico</label>
                        <input type="text" class="form-control" id="nomeCientifico" required>
                    </div>

                    <div class="mb-3">
                        <label>Produção Média (Kg)</label>
                        <input type="number" class="form-control" id="producao" required>
                    </div>

                    <div class="mb-3">
                        <label>Data do Plantio</label>
                        <input type="date" class="form-control" id="dataPlantio" required>
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="FrutasJs.js"></script>

</body>
</html>

Parte Do JavaScript:


let formFruta = document.getElementById('formFruta');

// Recupera do LocalStorage ou cria array vazio
let frutas = JSON.parse(localStorage.getItem('frutas')) || [];

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

// Criar Cards
function listarFrutas() {
    let frutas = JSON.parse(localStorage.getItem('frutas')) || [];
    let lista = document.getElementById("listaFrutas");
    lista.innerHTML = "";

    frutas.forEach(fruta => {
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
    });
}

// Função de calculo
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
