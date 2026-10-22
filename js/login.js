// Controla as abas e os formulários de cadastro e login.
const abaLogin = document.getElementById("abaLogin");
const abaCadastro = document.getElementById("abaCadastro");
const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");
const mensagemLogin = document.getElementById("mensagemLogin");

function mostrarMensagemLogin(texto, tipo) {
    mensagemLogin.textContent = texto;
    mensagemLogin.className = "mensagem " + tipo;
}

function selecionarAba(aba) {
    // Mostra apenas o formulário escolhido.
    const entrar = aba === "login";
    formLogin.classList.toggle("escondido", !entrar);
    formCadastro.classList.toggle("escondido", entrar);
    abaLogin.classList.toggle("ativa", entrar);
    abaCadastro.classList.toggle("ativa", !entrar);
    mensagemLogin.textContent = "";
}

abaLogin.addEventListener("click", function () { selecionarAba("login"); });
abaCadastro.addEventListener("click", function () { selecionarAba("cadastro"); });

formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Impede que a página recarregue ao enviar o formulário.

    const nome = document.getElementById("nomeCadastro").value.trim();
    const email = document.getElementById("emailCadastro").value.trim().toLowerCase();
    const senha = document.getElementById("senhaCadastro").value;

    const usuarios = lerDados("cantinaUsuarios", []);

    if (usuarios.some(function (usuario) { return usuario.email === email; })) {
        mostrarMensagemLogin("Já existe uma conta com esse e-mail neste navegador.", "erro");
        return;
    }

    // Demonstração escolar: não use senhas reais. Um sistema real precisa de back-end seguro.
    usuarios.push({ nome: nome, email: email, senha: senha });
    salvarDados("cantinaUsuarios", usuarios);
    salvarDados("cantinaUsuarioAtual", { nome: nome, email: email });

    mostrarMensagemLogin("Cadastro realizado! Você já está conectado nesta demonstração.", "sucesso");
    formCadastro.reset();
});

formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = document.getElementById("emailLogin").value.trim().toLowerCase();
    const senha = document.getElementById("senhaLogin").value;
    const usuarios = lerDados("cantinaUsuarios", []);

    const usuario = usuarios.find(function (item) {
        return item.email === email && item.senha === senha;
    });

    if (!usuario) {
        mostrarMensagemLogin("E-mail ou senha incorretos. Confira os dados ou crie uma conta.", "erro");
        return;
    }

    salvarDados("cantinaUsuarioAtual", { nome: usuario.nome, email: usuario.email });
    mostrarMensagemLogin("Bem-vindo(a), " + usuario.nome + "! Redirecionando para o cardápio...", "sucesso");
    setTimeout(function () { window.location.href = "sistema.html"; }, 900);
});
