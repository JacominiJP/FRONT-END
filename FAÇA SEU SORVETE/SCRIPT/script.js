//Variável Imutável para os 5 Paineis de escolhas
const paineis = [
    {
        nomeProduto: "RECIPIENTE",
        produto: [
            { nome: "CASQUINHA", preco: 0.60, imagem: "../IMG/recipiente/casquinha.jpg" },
            { nome: "COPINHO WAFER", preco: 0.70, imagem: "../IMG/recipiente/copowaffle.jpg" },
            { nome: "CASCÃO", preco: 1.20, imagem: "../IMG/recipiente/cascao.jpg" },
            { nome: "COPO PLÁSTICO", preco: 0.10, imagem: "../IMG/recipiente/copoplastico.jpg" },
        ]
    },
    {
        nomeProduto: "SABORES",
        produto: [
            { nome: "CHOCOLATE", preco: 4.00, imagem: "../IMG/sabores/chocolate.jpg" },
            { nome: "MORANGO", preco: 4.00, imagem: "../IMG/sabores/morango.jpg" },
            { nome: "MENTA", preco: 6.00, imagem: "../IMG/sabores/menta.jpg" },
            { nome: "AÇAÍ", preco: 5.00, imagem: "../IMG/sabores/acai.jpg" },
        ]
    },
    {
        nomeProduto: "COBERTURA",
        produto: [
            { nome: "CHOCOLATE", preco: 0.50, imagem: "../IMG/cobertura/Cchocolate.jpg" },
            { nome: "MORANGO", preco: 0.50, imagem: "../IMG/cobertura/Cmorango.jpg" },
            { nome: "NUTELLA", preco: 2.00, imagem: "../IMG/cobertura/Cnutella.jpg" },
            { nome: "CARAMELO", preco: 0.70, imagem: "../IMG/cobertura/Ccaramelo.jpg" },
        ]
    },
    {
        nomeProduto: "GRANULADOS",
        produto: [
            { nome: "COLORIDO", preco: 0.30, imagem: "../IMG/granulados/colorido.jpg" },
            { nome: "MINI M&M's", preco: 1.50, imagem: "../IMG/granulados/mem.jpg" },
            { nome: "OVOMALTINE", preco: 1.20, imagem: "../IMG/granulados/ovomaltine.jpg" },
            { nome: "PAÇOCA TRITURADA", preco: 1.50, imagem: "../IMG/granulados/pacoca.jpg" },
        ]
    },
    {
        nomeProduto: "COMPLEMENTOS",
        produto: [
            { nome: "BISCOITO OREO EM PEDAÇOS", preco: 1.50, imagem: "../IMG/complementos/oreo.jpg" },
            { nome: "CHANTILLY", preco: 1.50, imagem: "../IMG/complementos/chantilly.jpg" },
            { nome: "TUBES WAFER 2 UNIDADES", preco: 1.00, imagem: "../IMG/complementos/tubes.jpg" },
            { nome: "CEREJA", preco: 0.50, imagem: "../IMG/complementos/cereja.jpg" },
        ]
    },
];
 
//Variavéis Mutaveis para auxiliar em prosseguir o painel e armazenar as escolhas
let painelAtual = 0;
let escolhas = [];
let precoTotal = 0;
 
//Mais variáveis imutaveis do HTML -> Java Script
const painelContainer = document.getElementById("painelContainer");
const tipoItem        = document.getElementById("tipoItem");
const indice          = document.getElementById("indice");
const itens           = document.getElementById("Itens");
const voltar          = document.getElementById("Voltar");
const concluido       = document.getElementById("concluido");
const addPedidos      = document.getElementById("adicionarPedidos");
 

// Mostra como deve ficar o Preço dentro do HTML
function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}
 

// Função para partir ao próximo painel e mostrar pedido Concluido
function proximoPainel() {
    if (painelAtual < paineis.length - 1) {
        painelAtual++;
        mostrarPainel();
    } else if (painelAtual === paineis.length - 1) {
        mostrarPedido();
        concluido.style.display = "grid";
        painelContainer.style.display = "none";
    }
}
 
// Função que volta o painel sem manter excluindo o último item colocado
function voltarPainel() {
    if (painelAtual > 0) {
        const itemRemovido = escolhas.pop();
        precoTotal -= itemRemovido.preco; 
        painelAtual--;
        mostrarPainel();
    }
}
 
voltar.addEventListener("click", voltarPainel);
 

// Função Para voltar para o Final do Painel "1/5" e refazer o pedido do zero
function refazerPedido() {
    painelAtual = 0;
    escolhas    = [];
    precoTotal  = 0;
    concluido.style.display       = "none";
    painelContainer.style.display = "flex";
    mostrarPainel();
}
 
concluido.addEventListener("click", function(evento) {
    if (evento.target.id === "Inicio") {
        refazerPedido();
    }
});
 
// Função Para mostrar os itens escolhidos e valores
function mostrarPedido() {
    addPedidos.innerHTML = `<h1 class="painelConclusao">PEDIDO CONCLUÍDO</h1>`;
 

    const gridItens = document.createElement("div");
    gridItens.id = "gridItens";
    addPedidos.appendChild(gridItens);

    escolhas.forEach(function(produto) {
        const escolhasFeitas = document.createElement("div");
        escolhasFeitas.classList.add("itensEscolhidos");
 
        escolhasFeitas.innerHTML = `
            <img class="imagemItem" src="${produto.imagem}" alt="${produto.nome}">
            <h3 class="nomeItem">${produto.nome}</h3>
            <h3 class="preco">${formatarPreco(produto.preco)}</h3>
        `;
 
        gridItens.appendChild(escolhasFeitas);
    });
 
    const total = document.createElement("h2");
    total.classList.add("precoTotal");
    total.textContent = "TOTAL: " + formatarPreco(precoTotal);
    addPedidos.appendChild(total);
 
    const btnRefazer = document.createElement("button");
    btnRefazer.classList.add("Inicio");
    btnRefazer.id = "Inicio";
    btnRefazer.textContent = "Refazer Pedido";
    addPedidos.appendChild(btnRefazer);
}
 
// Função que mostra os Itens a ser escolhidos de cada painel
function mostrarPainel() {
    const painel = paineis[painelAtual];
 
    tipoItem.textContent = painel.nomeProduto;
    indice.textContent   = `${painelAtual + 1}/${paineis.length}`;
 
    itens.innerHTML = "";
 
    painel.produto.forEach(function(produto) {
        const botao = document.createElement("button");
        botao.classList.add("selecionar");
 
        botao.innerHTML = `
            <img class="imagemItem" src="${produto.imagem}" alt="${produto.nome}">
            <h3 class="nomeItem">${produto.nome}</h3>
            <h3 class="preco">${formatarPreco(produto.preco)}</h3>
        `;
 
        botao.addEventListener("click", function() {
            escolhas.push(produto);
            precoTotal += produto.preco;
            proximoPainel();
        });
 
        itens.appendChild(botao);
    });
 
    voltar.style.display = painelAtual > 0 ? "block" : "none";
}
 
concluido.style.display = "none";
mostrarPainel();