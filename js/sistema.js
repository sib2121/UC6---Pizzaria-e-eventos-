// Produtos disponíveis no cardápio. Os preços são ilustrativos.
const pizzas = [
    { id: 1, nome: "Margherita", descricao: "Molho de tomate, muçarela, tomate e manjericão.", preco: 39.90, emoji: "🍅" },
    { id: 2, nome: "Calabresa", descricao: "Calabresa fatiada, cebola e muçarela.", preco: 42.90, emoji: "🍕" },
    { id: 3, nome: "Quatro queijos", descricao: "Muçarela, provolone, parmesão e gorgonzola.", preco: 46.90, emoji: "🧀" },
    { id: 4, nome: "Frango com catupiry", descricao: "Frango temperado, catupiry e orégano.", preco: 45.90, emoji: "🍗" },
    { id: 5, nome: "Portuguesa", descricao: "Presunto, ovo, cebola, ervilha e muçarela.", preco: 44.90, emoji: "🫒" },
    { id: 6, nome: "Chocolate", descricao: "Chocolate cremoso para fechar a refeição.", preco: 35.90, emoji: "🍫" }
];

const taxaEntrega = 5;
let carrinho = lerDados("cantinaCarrinho", []);

const listaPizzas = document.getElementById("listaPizzas");
const itensCarrinho = document.getElementById("itensCarrinho");
const subtotalElemento = document.getElementById("subtotal");
const totalElemento = document.getElementById("total");
const mensagemCarrinho = document.getElementById("mensagemCarrinho");

// Mostra os produtos do cardápio na página.
function mostrarPizzas() {
    listaPizzas.innerHTML = "";

    pizzas.forEach(function (pizza) {
        const artigo = document.createElement("article");
        artigo.className = "cartao produto";
        artigo.innerHTML = `
            <div class="produto-figura">${pizza.emoji}</div>
            <h3>${pizza.nome}</h3>
            <p class="descricao">${pizza.descricao}</p>
            <p class="preco">${formatarMoeda(pizza.preco)}</p>
            <button class="botao largura-total" type="button" data-id="${pizza.id}">Adicionar ao carrinho</button>
        `;
        artigo.querySelector("button").addEventListener("click", function () {
            adicionarAoCarrinho(pizza.id);
        });
        listaPizzas.appendChild(artigo);
    });
}

function adicionarAoCarrinho(id) {
    const pizza = pizzas.find(function (item) { return item.id === id; });
    const itemExistente = carrinho.find(function (item) { return item.id === id; });

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ id: pizza.id, nome: pizza.nome, preco: pizza.preco, quantidade: 1 });
    }

    salvarDados("cantinaCarrinho", carrinho);
    mostrarCarrinho();
    mensagemCarrinho.textContent = pizza.nome + " adicionada ao carrinho.";
    mensagemCarrinho.className = "mensagem sucesso";
}

function removerDoCarrinho(id) {
    // Remove o item selecionado por completo do carrinho.
    carrinho = carrinho.filter(function (item) { return item.id !== id; });
    salvarDados("cantinaCarrinho", carrinho);
    mostrarCarrinho();
}

function mostrarCarrinho() {
    itensCarrinho.innerHTML = "";
    let subtotal = 0;

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = '<p class="texto-suave">Seu carrinho está vazio.</p>';
    }

    carrinho.forEach(function (item) {
        subtotal += item.preco * item.quantidade;

        const linha = document.createElement("div");
        linha.className = "item-carrinho";
        linha.innerHTML = `
            <div><strong>${item.nome}</strong>
            <small>${item.quantidade} × ${formatarMoeda(item.preco)}</small>
            <strong>${formatarMoeda(item.quantidade * item.preco)}</strong></div>
            <button type="button" class="remover-item" aria-label="Remover ${item.nome}">Remover</button>
        `;
        linha.querySelector("button").addEventListener("click", function () {
            removerDoCarrinho(item.id);
        });
        itensCarrinho.appendChild(linha);
    });

    subtotalElemento.textContent = formatarMoeda(subtotal);
    document.getElementById("entrega").textContent = formatarMoeda(taxaEntrega);
    totalElemento.textContent = formatarMoeda(subtotal + (carrinho.length > 0 ? taxaEntrega : 0));
}

document.getElementById("limparCarrinho").addEventListener("click", function () {
    carrinho = [];
    salvarDados("cantinaCarrinho", carrinho);
    mostrarCarrinho();
    mensagemCarrinho.textContent = "Carrinho limpo.";
    mensagemCarrinho.className = "mensagem sucesso";
});

document.getElementById("finalizarPedido").addEventListener("click", function () {
    if (carrinho.length === 0) {
        mensagemCarrinho.textContent = "Adicione pelo menos uma pizza antes de continuar.";
        mensagemCarrinho.className = "mensagem erro";
        return;
    }
    window.location.href = "pedidos.html";
});

mostrarPizzas();
mostrarCarrinho();
