// Funções compartilhadas por todas as telas.
function formatarMoeda(valor) {
    // Transforma um número em moeda brasileira, por exemplo: R$ 25,00.
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function lerDados(chave, valorPadrao) {
    // Lê os dados guardados no navegador. Se não existirem, usa o valor padrão.
    try {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : valorPadrao;
    } catch (erro) {
        return valorPadrao;
    }
}

function salvarDados(chave, dados) {
    // Converte os dados em texto JSON para que o navegador consiga guardá-los.
    localStorage.setItem(chave, JSON.stringify(dados));
}
