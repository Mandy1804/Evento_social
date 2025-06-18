let doacoes = JSON.parse(localStorage.getItem("doacoes")) || [];
let indiceEditando = null;

function renderizarTabela() {
  const tabela = document.getElementById("tabelaAtividade");
  tabela.innerHTML = "";

  doacoes.forEach((doacao, index) => {
    tabela.innerHTML += `
      <tr>
        <td>${doacao.nome}</td>
        <td>${doacao.email}</td>
        <td>${doacao.tipo}</td>
        <td>${doacao.quantidade}</td>
        <td>${doacao.disponivel}</td>
        <td>
          <button onclick="editarDoacao(${index})">Editar</button>
          <button onclick="excluirDoacao(${index})">Excluir</button>
        </td>
        <td>${doacao.nivel}</td>
      </tr>
    `;
  });
}


function calcularNivel(quantidade, disponivel) {
  let nivel = "";

  if (quantidade <= 2) {
    nivel = "Baixo";
  } else if (quantidade <= 5) {
    nivel = "Médio";
  } else {
    nivel = "Alto";
  }

  // Aume
  if (disponivel === "Sim") {
    if (nivel === "Baixo") return "Médio";
    if (nivel === "Médio") return "Alto";
  }

  return nivel;
}

function adicionarAtividade() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const tipo = document.getElementById("tipo").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const disponivel = document.getElementById("disponivelFds").checked ? "Sim" : "Não";

  if (!nome || !email || !tipo || isNaN(quantidade)) {
    alert("Preencha todos os campos!");
    return;
  }

  const nivel = calcularNivel(quantidade, disponivel);

  const novaDoacao = { nome, email, tipo, quantidade, disponivel, nivel };

  if (indiceEditando === null) {
    doacoes.push(novaDoacao);
  } else {
    doacoes[indiceEditando] = novaDoacao;
    indiceEditando = null;
  }

  salvarDados();
  limparCampos();
  renderizarTabela();
}

function editarDoacao(index) {
  const doacao = doacoes[index];
  document.getElementById("nome").value = doacao.nome;
  document.getElementById("email").value = doacao.email;
  document.getElementById("tipo").value = doacao.tipo;
  document.getElementById("quantidade").value = doacao.quantidade;
  document.getElementById("disponivelFds").checked = doacao.disponivel === "Sim";

  indiceEditando = index;
}

function excluirDoacao(index) {
  if (confirm("Deseja excluir este registro?")) {
    doacoes.splice(index, 1);
    salvarDados();
    renderizarTabela();
  }
}

function salvarDados() {
  localStorage.setItem("doacoes", JSON.stringify(doacoes));
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("tipo").value = "Educação";
  document.getElementById("quantidade").value = "";
  document.getElementById("disponivelFds").checked = false;
}

renderizarTabela();
