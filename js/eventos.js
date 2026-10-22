// Registra as solicitações de eventos no armazenamento deste navegador.
const formEvento = document.getElementById("formEvento");
const mensagemEvento = document.getElementById("mensagemEvento");
const dataEvento = document.getElementById("dataEvento");

// Impede que o usuário escolha uma data anterior à data de hoje.
const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");
dataEvento.min = ano + "-" + mes + "-" + dia;

formEvento.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const reserva = {
        id: Date.now(),
        nome: document.getElementById("nomeEvento").value.trim(),
        contato: document.getElementById("contatoEvento").value.trim(),
        tipo: document.getElementById("tipoEvento").value,
        data: dataEvento.value,
        horario: document.getElementById("horarioEvento").value,
        convidados: Number(document.getElementById("convidadosEvento").value),
        detalhes: document.getElementById("detalhesEvento").value.trim(),
        status: "Solicitação recebida"
    };

    const eventos = lerDados("cantinaEventos", []);
    eventos.push(reserva);
    salvarDados("cantinaEventos", eventos);

    mensagemEvento.textContent = "Solicitação registrada! Esta é uma confirmação demonstrativa; a reserva ainda precisaria ser confirmada pela pizzaria.";
    mensagemEvento.className = "mensagem sucesso";
    formEvento.reset();
    dataEvento.min = ano + "-" + mes + "-" + dia;
});
