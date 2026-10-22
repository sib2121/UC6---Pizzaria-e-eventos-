// Monta o resumo do pedido, permite confirmar e mostra o histórico.
const taxaEntregaPedido = 5;
const resumoAtual = document.getElementById("resumoAtual");
const formFinalizar = document.getElementById("formFinalizar");
const mensagemPedido = document.getElementById("mensagemPedido");
const historicoPedidos = document.getElementById("historicoPedidos");
const historicoEventos = document.getElementById("historicoEventos");

function carregarResumo() {
    const carrinho = lerDados("cantinaCarrinho", []);

    if (carrinho.length === 0) {
        resumoAtual.innerHTML = '<p class="texto-suave">Você ainda não tem itens para finalizar. Acesse o cardápio para escolher suas pizzas.</p>';
        formFinalizar.classList.add("escondido");
        return;
    }

    let subtotal = 0;
    let html = "";
    carrinho.forEach(function (item) {
        const totalItem = item.preco * item.quantidade;
        subtotal += totalItem;
        html += `<div class="resumo-linha"><span>${item.quantidade} × ${item.nome}</span><strong>${formatarMoeda(totalItem)}</strong></div>`;
    });

    html += `<div class="resumo-linha"><span>Subtotal</span><strong>${formatarMoeda(subtotal)}</strong></div>`;
    html += `<div class="resumo-linha"><span>Entrega</span><strong>${formatarMoeda(taxaEntregaPedido)}</strong></div>`;
    html += `<div class="resumo-linha"><strong>Total</strong><strong>${formatarMoeda(subtotal + taxaEntregaPedido)}</strong></div>`;
    resumoAtual.innerHTML = html;
    formFinalizar.classList.remove("escondido");
}

formFinalizar.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const carrinho = lerDados("cantinaCarrinho", []);
    if (carrinho.length === 0) {
        mensagemPedido.textContent = "Seu carrinho está vazio.";
        mensagemPedido.className = "mensagem erro";
        carregarResumo();
        return;
    }

    const subtotal = carrinho.reduce(function (soma, item) {
        return soma + item.preco * item.quantidade;
    }, 0);

    const pedidos = lerDados("cantinaPedidos", []);
    const novoPedido = {
        numero: pedidos.length + 1,
        data: new Date().toLocaleString("pt-BR"),
        itens: carrinho,
        subtotal: subtotal,
        entrega: taxaEntregaPedido,
        total: subtotal + taxaEntregaPedido,
        endereco: document.getElementById("endereco").value.trim(),
        pagamento: document.getElementById("pagamento").value,
        status: "Confirmado (demonstração)"
    };

    pedidos.unshift(novoPedido);
    salvarDados("cantinaPedidos", pedidos);
    salvarDados("cantinaCarrinho", []);

    mensagemPedido.textContent = "Pedido #" + novoPedido.numero + " confirmado com sucesso! Esta confirmação é apenas demonstrativa.";
    mensagemPedido.className = "mensagem sucesso";
    formFinalizar.reset();
    carregarResumo();
    mostrarHistoricoPedidos();
});

function mostrarHistoricoPedidos() {
    const pedidos = lerDados("cantinaPedidos", []);
    historicoPedidos.innerHTML = "";

    if (pedidos.length === 0) {
        historicoPedidos.innerHTML = '<p class="texto-suave">Nenhum pedido confirmado ainda.</p>';
        return;
    }

    pedidos.forEach(function (pedido) {
        const cartao = document.createElement("article");
        cartao.className = "cartao cartao-historico";
        const nomes = pedido.itens.map(function (item) {
            return item.quantidade + " × " + item.nome;
        }).join(", ");

        cartao.innerHTML = `
            <h3>Pedido #${pedido.numero}</h3>
            <p>${pedido.data}</p>
            <p><strong>Itens:</strong> ${nomes}</p>
            <p><strong>Endereço:</strong> ${pedido.endereco}</p>
            <p><strong>Pagamento:</strong> ${pedido.pagamento}</p>
            <p><strong>Status:</strong> ${pedido.status}</p>
            <p class="preco">Total: ${formatarMoeda(pedido.total)}</p>
        `;
        historicoPedidos.appendChild(cartao);
    });
}

function mostrarHistoricoEventos() {
    const eventos = lerDados("cantinaEventos", []);
    historicoEventos.innerHTML = "";

    if (eventos.length === 0) {
        historicoEventos.innerHTML = '<p class="texto-suave">Nenhuma solicitação de evento registrada ainda.</p>';
        return;
    }

    eventos.slice().reverse().forEach(function (evento) {
        const cartao = document.createElement("article");
        cartao.className = "cartao cartao-historico";
        cartao.innerHTML = `
            <h3>${evento.tipo}</h3>
            <p><strong>Responsável:</strong> ${evento.nome}</p>
            <p><strong>Data:</strong> ${evento.data} às ${evento.horario}</p>
            <p><strong>Convidados:</strong> ${evento.convidados}</p>
            <p><strong>Contato:</strong> ${evento.contato}</p>
            <p><strong>Status:</strong> ${evento.status}</p>
        `;
        historicoEventos.appendChild(cartao);
    });
}

carregarResumo();
mostrarHistoricoPedidos();
mostrarHistoricoEventos();
